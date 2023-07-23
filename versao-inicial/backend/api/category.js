/* API de categoria */

module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = (req, res) => {
        const category = { 
            id: req.body.id,
            name: req.body.name,
            parentId: req.body.parentId
         }
        if(req.params.id) category.id = req.params.id

        try {
            existsOrError(category.name, 'Nome não informado')
        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(category.id) {
            // Se for PUT
            app.db('categories')
                .update(category)
                .where({id: category.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            // Se for POST
            app.db('categories')
                .insert(category)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            // Tem que existir se não dá erro
            existsOrError(req.params.id, 'Código da Categoria não informado.')

            const subcategory = await app.db('categories') // Validar se tem subcategoria 
                .where({ parentId: req.params.id })
            // Não tem que exitir se não dá erro
            notExistsOrError(subcategory, 'Categoria possui subcategorias.') // Se tiver categoria filha ou subcategoria na categoria que eu quero remover ele não vai deixar (erro) 
        
            const articles = await app.db('articles')
            .where({ categoryId: req.params.id })
            notExistsOrError(articles, 'Categoria possui artigos.')

            const rowsDeleted = await app.db('categories')
                .where({ id: req.params.id }).del()
            existsOrError(rowsDeleted, 'Categoria não foi encontrada.')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    // Função que receba uma lista de categorias e vai retornar a categoria com mais um atributo chamado PATH
    // Esse atributo PATH vai ser montado pelo meu backend
    const withPath = categories => {
        const getParent = (categories, parentId) => { // Pegando a categoria pai
            const parent = categories.filter(parent => parent.id === parentId)
            return parent.length ? parent[0] : null
        }
    
        const categoriesWithPath = categories.map(category => {
            let path = category.name
            let parent = getParent(categories, category.parentId)

            while(parent) { // Enquanto tiver parent continue concatenando
                path = `${parent.name} > ${path}`
                parent = getParent(categories, parent.parentId) // Procurar o proximo parent
            }

            return { ...category, path }
        })

        // Ordernando as categorias em ordem alfabetica
        categoriesWithPath.sort((a, b) => {
            if(a.path < b.path) return -1
            if(a.path > b.path) return 1
            return 0
        })

        return categoriesWithPath
    }

    const get = (req, res) => {
        app.db('categories')
            .then(categories => res.json(withPath(categories)))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('categories')
            .where({ id: req.params.id })
            .first()
            .then(category => res.json(category))
            .catch(err => res.status(500).send(err))
    }

    // Função para transformar a lista de categorias em uma estrutura de arvore
    const toTree = (categories, tree) => {
        if(!tree) tree = categories.filter(c => !c.parentId) // Filtrar apenas as categorias que não tem o parentId setado 
        tree = tree.map(parentNode => {  // Encontrar quais são os filhos desse nó especifico
            const isChild = node => node.parentId == parentNode.id  
            parentNode.children = toTree(categories, categories.filter(isChild)) // Para as proximas subcategorias
            return parentNode
        })
        return tree
    }

    const getTree = (req, res) => {
        app.db('categories')
            .then(categories => res.json(toTree(withPath(categories))))
            .catch(err => res.status(500).send(err))
    }

    return { save, remove, get, getById, getTree }

}