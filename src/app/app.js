const express = require ('express')
const bodyParser = require ('body-parser')
const userRoutes = require('../app/user/user.routes')
const productsRoutes = require ('../app/product/product.routes')
const loginRoutes = require ('./login/login.routes')
const userAuthentication = require ('../app/middlewares/jwtAuth')



const app = express()

app.use(bodyParser.json())

app.use('/api/v1', loginRoutes)
app.use('/api/v1', userRoutes)
app.use('/api/v1', productsRoutes)



module.exports = app