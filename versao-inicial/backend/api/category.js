module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = (req, res) => {
        const category = { ...req.body }
        if(req.category.id) category.id = req.params.id

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
            app.db(category)
                .insert(category)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            // Tem que existir se não dá erro
            existsOrError(req.params.id, 'Código da categoria não informado.')

            const subcategory = await app.db('categories') // Validar se tem subcategoria 
                .where({parendId: req.params.id})
            // Não tem que exitir se não dá erro
            notExistsOrError(subcategory, 'Categoria possui subcategorias.') // Se for uma categoria filha ou subcategoria da categoria que eu estou remover ele não vai deixar (erro) 
        
            const articles = await app.db('articles')
                .where({categoryId: req.params.id})
            notExistsOrError(articles, 'Categoria possui artigos.')

            const rowsDeleted = await app.db('categories')
                .where({id: req.params.id}).del()
            existsOrError(rowsDeleted, 'Categoria não foi encontrada.')

            res.status(204).send()
        } catch {
            res.status(400).send(msg)
        }
    }

}