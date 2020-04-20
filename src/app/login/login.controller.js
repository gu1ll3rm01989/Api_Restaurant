const Login = require ('./login.model')
const config = require ('../../config/server')
const jwt = require ('jsonwebtoken')

const firma = config.JWT.PRIVATE_KEY

    const userAuthentication = async (sequelize, username) => {
        try {
            const userNameQuery = await sequelize.query (`SELECT user_username FROM delilah.user WHERE user_username = '${username}';`,
                { type: sequelize.QueryTypes.SELECT})            
                console.log(userNameQuery[0])
                    if (typeof userNameQuery[0] != 'undefined') {
                        console.log('HAY USUARIOOOOO')
                        const userName = Object.values(userNameQuery[0])
                        userNameValid = userName[0]
                            if (username === userNameValid ) {                        
                                console.log('HAY USUSARIO CORRECTOOOOOOOOO')
                                return userNameValid 
                                }else{
                                    return
                                }
                    }else{
                        return
                    }
        } catch (error) {
            return
        }
    }

    const passAuthentication = async (sequelize, pass, username) => {
        try {
            const passQuery = await sequelize.query (`SELECT user_pass FROM delilah.user WHERE user_username = '${username}';`,
                { type: sequelize.QueryTypes.SELECT}) 
                console.log(passQuery[0])
                    if (typeof passQuery[0] != 'undefined' ) {
                        console.log('HAY CONTRASEÑA')
                        passQueryValue = Object.values(passQuery[0])
                        passValid = passQueryValue[0]
                        console.log(passValid)
                            if (pass === passValid ) {                        
                            console.log('HAY CONTRASEÑA CORRECTAAAAAAAAAAAA')
                            return passValid 
                            }else{
                                return
                            }       
                    }else{
                        return
                    }
            } catch (error) {
                return
            }
    }

    const generateToken = async (sequelize, username) => {
        try {
            const userIdQuery = await sequelize.query (`SELECT user_id FROM delilah.user WHERE user_username = '${username}';`,
                { type: sequelize.QueryTypes.SELECT})
            userId = Object.values(userIdQuery[0])
            userIdValid = userId[0]
            console.log(userIdValid,'ID USERNAME')
                token = jwt.sign(username,firma)                
                const login = new Login (token)
                await sequelize.query(`INSERT INTO delilah.login (login_token, user_id) VALUES (?, ?)`,
                    {replacements: [login.token, userIdValid]
                    }) 
                    return token
        } catch (error) {
            return
        }
    }

    const adminRol = async (sequelize, username) => {
        try {
            const userRolQuery = await sequelize.query (`SELECT r.rol_id  FROM delilah.user as u
                                JOIN delilah.rol as r ON r.rol_id = u.rol_id
                                WHERE u.user_username ='${username}'`,
                { type: sequelize.QueryTypes.SELECT})
            userRol = Object.values(userRolQuery[0])
            userRolValid = userRol[0]
            return userRolValid
        } catch (error) {
            
        }

    }



module.exports = {
    userAuthentication,
    passAuthentication,
    generateToken,
    adminRol
}