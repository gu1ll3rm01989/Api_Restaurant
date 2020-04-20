const server = require ('./app/app')
const config = require ('./config/server')
const sequelize = require ('./app/db.conection')


sequelize
        .authenticate()
        .then(() => {
        console.log(`######################
######################`)
        console.log('DATABASE CONNECTION has been established SUCCESSFULLY.')
                            
        server.listen(config.SERVER_PORT, () => {
        console.log(`######################
###### API REST ######
######################`)
        console.log(`SERVER is RUNNING at PORT ${config.SERVER_PORT}!!!`)
            })
        })
        .catch(err => console.error('Unable to connect to the database:', err))
