const sequelize = require ('../db.conection')
const express = require ('express')
const router = express.Router()
const DbQuerys = require ('./login.controller')
const jwt = require ('jsonwebtoken')


const errorLogin = 'Incorrect data or unregistered user'
const loginSucesfull = 'Login User'
router  
        .post('/login', async (req, res) => {
                try {
                        const login = req.body
                        await DbQuerys.loginUsers(sequelize, login)
                        console.log(login)
                        const {username} = req.body
                        console.log(username)
                        await DbQuerys.loginRegistration(sequelize, username)
                        console.log(usernameValid[0])

                        if (username == usernameValid[0]) {
                            res.json({loginSucesfull})
                        }
                        else {
                            res.json({errorLogin})
                        }
                } catch (error) {
                    res.status(500).json({error: errorLogin})
                    
                }
        })


        .post('/login/protected', DbQuerys.loginAuthentication ,(req, res) => {
            res.json({test: 'ESTA ES UNA PAGINA AUTENTICADA'})
        })

        
        

        
        

module.exports = router