const server = require ('./app/app')
const config = require ('./config/server')
const sequelize = require ('./app/db.conection')


sequelize
        .authenticate()
        .then(() => {
        console.log('Database connection has been established successfully.')
                            
        server.listen(config.SERVER_PORT, () => {
        console.log(`Server is running at port ${config.SERVER_PORT}`)
            })
        })
        .catch(err => console.error('Unable to connect to the database:', err))
