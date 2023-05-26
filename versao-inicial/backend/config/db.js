const config = require('../knexfile.js')
const knex = require('knex')(config) // Passando o arquivo de configuração de conexão com o banco de dados

knex.migrate.lasted([config])
module.exports = knex