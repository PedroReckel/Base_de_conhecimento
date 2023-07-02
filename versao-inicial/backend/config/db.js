const config = require('../knexfile.js')
const knex = require('knex')(config) // Passando o arquivo de configuração de conexão com o banco de dados

knex.migrate.latest([config]) // Passando essa configuração ele vai executar a migração toda vez que eu carregar o meu backend 
module.exports = knex