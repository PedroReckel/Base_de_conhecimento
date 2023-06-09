module.exports = app => {
    app.route('/users')
        .post(app.api.user.save)
        .get(app.api.user.get)

    app.route('/users:id')
        .put(app.api.user.save)
        .get(app.api.user.getById)

    app.route('/categories')
        .get(app.api.category.get)
        .post(app.api.category.save)

    // Cuidado com ordem! Tem que vir antes de /categories/:id    
    // É necessário sempre colocar as URL's mais expercificas mais em cima e as URL's mais genericas em baixo
    app.route('/categories/tree')
        .get(app.api.category.getTree)

    app.route('/categories/:id')
        .get(app.api.category.getById)
        .put(app.api.category.save)
        .delete(app.api.category.remove)

    app.route('/articles')
        .get(app.api.article.get)
        .post(app.api.article.save)

    app.route('/articles/:id')
        .get(app.api.article.getById)
        .put(app.api.article.save)
        .delete(app.api.article.remove)
}