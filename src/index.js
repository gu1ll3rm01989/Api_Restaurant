const Sequelize = require ('sequelize')
const config = require ('./config/server')
const server = require ('./app/app')

const dbString = `mysql://${config.DDBB.USER}:${config.DDBB.PASS}@${config.DDBB.HOST}:${config.DDBB.PORT}/${config.DDBB.NAME}`
const sequelize = new Sequelize (dbString)

sequelize
        .authenticate()
        .then(() => {
            console.log('Database connection has been established successfully.')
            
            server.listen(config.SERVER_PORT, () => {
                console.log(`Server is running at port ${config.SERVER_PORT}`)
            })
        })
        .catch(err => console.error('Unable to connect to the database:', err))

module.exports = sequelize