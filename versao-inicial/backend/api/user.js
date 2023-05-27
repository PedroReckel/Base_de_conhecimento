const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const encryptPassword = password => { // Gerar senha criptografada
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = async (req, res) => {
        const user = { ...req.body }
        if(req.params.id) user.id = req.params.id

        try { 
            // Tem que existir se não dá erro
            existsOrError(user.name, 'Nome não informado')
            existsOrError(user.email, 'E-mail não informado')
            existsOrError(user.password, 'Senha não informada')
            existsOrError(user.confirmPassoword, 'Confirmação de senha invalida')                                                                                                          
            equalsOrError(user.password, user.confirmPassoword, 'As senhas não conferem')

            const userFromDB = await app.db('users').where({ email: user.email }).first() // Buscando o email no banco
            if(!user.id) {
                // Não tem que exitir se não dá erro
                notExistsOrError(userFromDB, 'Usuário já cadastrado')
            } 
        } catch(msg) {
            return res.status(400).send(msg)
        }

        user.password = encryptPassword(user.password)
        delete user.confirmPassoword

        if(user.id) { // Se for PUT
            app.db('users')
                .update(user)
                .where({ id: user.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else { // Se for POST
            app.db('users')
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }  
    }
        const get = (req, res) => {
            app.db('users')
                .select('id', 'name', 'email', 'admin')
                .then(users => res.json(users))
                .catch(err => res.status(500).send(err))
        }

        const getById = (req, res) => {
            app.db('users')
                .select('id', 'name', 'email', 'admin')
                .where('id', req.params.id)
                .then(users => res.json(users))
                .catch(err => res.status(500).send(err))
        }

    return { save, get, getById }
}