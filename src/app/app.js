const express = require ('express')
const bodyParser = require ('body-parser')
const userRoutes = require('./user/user.routes')
const productsRoutes = require ('./product/product.routes')
const loginRoutes = require ('./login/login.routes')
const orderRouter = require ('./order/order.routes')
const roleAuthe = require ('./role/role.authen')




const app = express()

app.use(bodyParser.json())

app.use('/api/v1', loginRoutes)

app.use(roleAuthe)

app.use('/api/v1', userRoutes)

app.use('/api/v1', orderRouter)

app.use('/api/v1', productsRoutes)



module.exports = app