/* API de artigo */
const queries = require('./queries')

module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = (req, res) => {
        const article = { ...req.body }
        if(req.params.id) article.id = req.params.id

        try {
            existsOrError(article.name, 'Nome não informado')
            existsOrError(article.description, 'Descrição não informada')
            existsOrError(article.categoryId, 'Categoria não informada')
            existsOrError(article.userId, 'Autor não informado')
            existsOrError(article.content, 'Conteúdo não informado')
        } catch(msg) {
            res.status(400).send(msg)
        }

        if(article.id) {
            app.db('articles')
                .update(article)
                .where({ id: article.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('articles')
                .insert(article)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('articles')
                .where({ id: req.params.id }).del()
            
            try {
                existsOrError(rowsDeleted, 'Artigo não foi encontrado.')
            } catch(msg) {
                return res.status(400).send(msg)    
            }

            res.status(204).send()
        } catch(msg) {
            res.status(500).send(msg)
        }
    }

    const limit = 3 // Limitar quantos artigos eu vou mandar em cada uma das paginas (Nesse caso quero no máximo 10 registros) // Usado para paginação
    const get = async (req, res) => {
        const page = req.query.page || 1 // Caso essa atributo não esteja setado eu vou exibir a pagina 1

        const result = await app.db('articles').count('id').first() // É importante ter o COUNT para que eu consiga definir quantas paginas vão ser definidas a partir da quantidade por pagina
        const count = parseInt(result.count)

        app.db('articles')
            .select('id', 'name', 'description')
            .limit(limit).offset(page * limit - limit) // Deslocamento para trazer os dados
            .then(articles => res.json({ data: articles, count, limit })) // Aqui ele vai fazer uma unica requisição para pegar os arquivos e vai retornar os artigos e os atributos COUNT e LIMIT
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('articles')
            .where({ id: req.params.id })
            .first()
            .then(article => { 
                article.content = article.content.toString() 
                return res.json(article)
            })
            .catch(err => res.status(500).send(err))
    }

    const getByCategory = async (req, res) => {
        const categoryId = req.params.id // Id da categoria pai
        const page = req.query.page || 1  
        const categories = await app.db.raw(queries.categoryWithChildren, categoryId) // Pegar todos os artigos que pertecem a categoria que foi informada e os filhos
        const ids = categories.rows.map(c => c.id) // Cria uma array com todos os ID's de categorias // Id das categorias filhas

        app.db({a: 'articles', u: 'users'}) // Fazendo um "Inner join" usando o KNEX
            .select('a.id', 'a.name', 'a.description', 'a.imageUrl', { author: 'u.name' })
            .limit(limit).offset(page * limit - limit)
            .whereRaw('?? = ??', ['u.id', 'a.userId']) // Campos comuns as duas tabelas
            .whereIn('categoryId', ids)
            .orderBy('a.id', 'desc')
            .then(articles => res.json(articles))
            .catch(err => res.status(500).send(err))
    }
 
return { save, remove, get, getById, getByCategory }

}