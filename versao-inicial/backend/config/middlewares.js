const bodyParser = require('body-parser')  
const cors = require('cors') // CORS é para permitir que eu possa a partir de uma origem diferente (outra aplicação) acessar a minha API

module.exports = app => {
    app.use(bodyParser.json())
    app.use(cors())
}