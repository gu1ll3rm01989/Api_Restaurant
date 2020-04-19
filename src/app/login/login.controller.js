const Login = require ('./login.model')
const config = require ('../../config/server')
const jwt = require ('jsonwebtoken')

const firma = config.JWT.PRIVATE_KEY



const DbQuerys = {
    loginUsers: async (sequelize, {username, pass}) => {
        try {
            const userNameQuery = await sequelize.query (`SELECT user_username FROM delilah.user WHERE user_username = '${username}';`,
                    { type: sequelize.QueryTypes.SELECT}) 
            const passQuery = await sequelize.query (`SELECT user_pass FROM delilah.user WHERE user_pass = '${pass}';`,
                    { type: sequelize.QueryTypes.SELECT}) 
            const userIdQuery = await sequelize.query (`SELECT user_id FROM delilah.user WHERE user_username = '${username}';`,
            { type: sequelize.QueryTypes.SELECT})             


            if ( typeof userNameQuery[0] != 'undefined' ) {
            console.log('SI EXISTE')
            usernameValid = Object.values(userNameQuery[0])
            passValid = Object.values(passQuery[0])
            userIdValid= Object.values(userIdQuery[0])          
                if (username === usernameValid[0]  && pass === passValid[0] ) {
                    console.log('SI EXISTE')
                    token = jwt.sign(username,firma)                
                    const login = new Login (token)
                    await sequelize.query(`INSERT INTO delilah.login (login_token, user_id) VALUES (?, ?)`,
                    {replacements: [login.token, userIdValid[0]]
                    })
                    return true
                }
            }
            else if(typeof userNameQuery[0] == 'undefined'){
                console.log('NO EXISTE')
                const stateUser = 'no existe'
                return false
            }            
        } catch (error) {
            console.log('ERROR: ' + error)
        }
    },


    loginRegistration: async (sequelize, username) => {
        try {
            const userNameQuery = await sequelize.query (`SELECT user_username FROM delilah.user WHERE user_username = '${username}';`,
                    { type: sequelize.QueryTypes.SELECT})
            usernameValid = Object.values(userNameQuery[0])            
            return usernameValid
        } catch (error) {
            
        }
    },


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
            res.send('ERROR: NO SE REGISTRA UN TOKEN EN AUTHORIZATION O ES INCORRECTO, TIENE QUE TENER EL SIGUIENTE FORMATO Bearer {token}')
        }
    }
}

module.exports = DbQuerys