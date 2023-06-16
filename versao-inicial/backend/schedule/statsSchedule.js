/* Esse schedule vai pesquisar no bando a cada um minuto para validar se algo foi alterado e fazer a contagem de registros */

const schedule = require('node-schedule')

module.exports = app => {
    schedule.scheduleJob('*/1 * * * *', async function() { // Definindo para o Schedule executar a cada 1 minuto 
        const usersCount = await app.db('users').count('id').first()
        const categoriesCount = await app.db('categories').count('id').first()
        const articlescount = await app.db('articles').count('id').first()

        const { Stat } = app.api.stats

        const lastStat = await Stat.findOne({}, {}, // Pegar a ultima estatistica cadastrada no MongoDB
            { sort: { 'createdAt': -1 } })

        const stat = new Stat({
            users: usersCount.count,
            categories: categoriesCount.count,
            articles: articlescount.count,
            createdAt: new Date()
        })

        const changeUsers = !lastStat || stat.users !== lastStat.users
        const changeCategories = !lastStat || stat.categories !== lastStat.categories
        const changeArticles = !lastStat || stat.articles !== lastStat.articles

        if(changeUsers || changeCategories || changeArticles) {
            stat.save().then(() => console.log('[Stats] Estatísticas atualizadas!'))
        }
    })
}