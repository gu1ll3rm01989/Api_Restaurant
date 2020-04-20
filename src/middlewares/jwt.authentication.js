const jwt = require ('jsonwebtoken')
const config = require('../config/server')

const firma = config.JWT.PRIVATE_KEY
const errorToken = 'ERROR: NO TOKEN IS REGISTERED IN AUTHORIZATION OR IT IS WRONG, IT MUST HAVE THE FOLLOWING FORMAT Bearer {token}'

const jsonWebToken = {

    loginAuthentication: (req, res, next) => {
        try {
                const token = req.headers.authorization.split(' ')[1]
                console.log(token)
                const verifyToken = jwt.verify(token, firma)
                console.log(verifyToken)
                if (verifyToken) {
                    req.username = verifyToken
                    next()                    
                }
        } catch (error) {
            res.send(errorToken)
        }
    },

    rolAuthentication : (req, res, next) => {
        try {
            
        } catch (error) {
            
        }
    }
}


module.exports = jsonWebToken