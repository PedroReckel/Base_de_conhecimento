const mongoose = require('mongoose') // Mongoose é uma biblioteca de programação orientada a objetos JavaScript que cria uma conexão entre o MongoDB e o ambiente de tempo de execução Node.js.
mongoose.connect('mongodb://localhost/knowledge_status', { useNewUrlParser: true })
    .catch(e => {
        const msg = 'ERRO! Não foi possível conectar com o MongoDB!'
        console.log('\x1b[41m%s\x1b[37m', msg, '\x1b[0m')  // Adicionando cor na mensagem do log

    })