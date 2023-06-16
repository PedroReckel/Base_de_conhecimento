const app = require('express')()
const consing = require('consign') // O consing vai nos ajudar a fazer as dependencias dentro da minha aplicação (utilizando o require e module.exports).
                                   // Para a gente não precisar fazer require de todos os arquivos da nossa aplicação o consing vai nos ajudar a fazer isso.
const db = require('./config/db')
const mongoose = require('mongoose')

require('./config/mongodb')

app.db = db
app.mongoose = mongoose

consing()
    .include('./config/passport.js')
    .then('./config/middlewares.js') // O consing vai ser responsavel por colocar os nossos metodos e API tudo dentro de APP
    .then('./api/validation.js')
    .then('./api')
    .then('./schedule')
    .then('./config/routes.js')
    .into(app) // Injetar como parametro o APP em cada uma das dependencias

app.listen(3000, () => {
    console.log('Backend executando...')
})