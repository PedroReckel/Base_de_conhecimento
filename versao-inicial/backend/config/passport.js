/* Filtrar requisições que não tenham o token valido */

const { authSecret } = require('../.env') // Ver se o token foi assinado de forma correta
const passport = require('passport') // Passport is authentication middleware for Node.js
const passportJwt = require('passport-jwt') // A Passport strategy for authenticating with a JSON Web Token.
const { Strategy, ExtractJwt } = passportJwt

module.exports = app => {
    const params = {
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() // Token extraido do request
    }

    const strategy = new Strategy(params, (payload, done) => {
        app.db('users')
            .where({ id: payload.id })
            .first()
            .then(user => done(null, user ? { ...payload } : false)) // Se o usuários estiver setado eu retorno o payload
            .catch(err => done(err, false))
    })

    passport.use(strategy)

    return {
        authenticate: () => passport.authenticate('jwt', { session: false })
    }
}