const config = require('../knexfile.js')
const knex = require('knex')(config) // Passando o arquivo de configuração de conexão com o banco de dados

module.exports = knex