const Sequelize = require ('sequelize')
const config = require ('../config/server')


const dbString = `mysql://${config.DDBB.USER}:${config.DDBB.PASS}@${config.DDBB.HOST}:${config.DDBB.PORT}/${config.DDBB.NAME}`
const sequelize = new Sequelize (dbString)

module.exports = sequelize

