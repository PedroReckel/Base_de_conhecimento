const { authSecret } = require('../.env')
const jwt = require('jwt-simple') // JWT (JSON Web Token) é um padrão de token de acesso baseado em JSON 
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const signin = async (req, res) => {
        if(!req.body.email || !req.body.password) {
            return res.status(400).send('Usuário não encontrado!')
        }

        const user = await app.db('users')
            .where({ email: req.body.email })
            .first()

        if(!user) return res.status(400).send('Usuário não encontrado!')

        const isMatch = bcrypt.compareSync(req.body.password, user.password)
        if(!isMatch) return res.status(401).send('Credenciais inválidas!')

        const now = Math.floor(Date.now() / 1000)

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            iat: now, // iat = issued at (emitido em)
            exp: now + (60 * 60 * 6) // Definindo quando o até quando o token será valido
        }

        res.json({ // Mandando o token para o usuário
            ...payload,
            token: jwt.encode(payload, authSecret)
        })
    }

    const validateToken = async (req, res) => {
        const userData = req.body || null
        try {
            if(userData) {
                const token = jwt.decode(userData.token, authSecret) // Decodificação do token
                if(new Date(token.exp * 1000) > new Date()) {
                    return res.send(true)
                }
            }
        } catch(e) {
            // Problema com o token  
        }

        res.send(false)
    }

    // Validação de usuário admin no backend
    const validateAdmin = async (req, res) => {
        const userData = req.body || null
        try {
            const token = jwt.decode(userData.token, authSecret)
            const user = await app.db('users')
                .where({ email: token.email})
                .whereNull('deletedAt')
                .first()
            if(user.admin && token.admin){
                return res.send(true)
            }
        } catch(e) {
            res.status(401).send('Você não tem permissão para acessar esta página!')
        }
        
        return res.send(false)
    }
 
    return { signin, validateToken, validateAdmin }
}