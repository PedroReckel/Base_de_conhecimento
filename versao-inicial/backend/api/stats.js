/* Modelo tendo informações de usuários, categoria e artigos e também a data de criação */

module.exports = app => {
    const Stat = app.mongoose.model('Stat', {
        users: Number,
        categories: Number,
        articles: Number,
        createdAt: Date
    })

    // Metodo que vai obter do MongoDB a ultima estatistica 
    const get = (req, res) => {
        Stat.findOne({}, {}, { sort: { 'createdAt': -1 } }) // Pegar a ultima estatistica cadastrada no MongoDB
            .then(stat => {
                const defaultStat = {
                    user: 0,
                    categories: 0,
                    articles: 0
                }
                res.json(stat || defaultStat)
            })
    }

    return { Stat, get }
}