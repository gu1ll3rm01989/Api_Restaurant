const sequelize = require ('../db.conection')
const express = require ('express')
const router = express.Router()
const controller = require ('./login.controller')
const jwt = require ('jsonwebtoken')
const tokenAuthentication = require ('../../middlewares/jwt.authentication')


const errorLogin = 'Incorrect data or unregistered user'
const loginSucesfull = 'Login User'
router  
        .post('/login', async (req, res) => {
                try {
                        const {username} = req.body
                        await controller.userAuthentication(sequelize, username)
                        console.log(userNameValid,'USER ID LOGIN')                      
                            if (userNameValid === username) {
                                const {pass} = req.body
                                await controller.passAuthentication(sequelize, pass, username)
                                console.log(passValid,'PASS LOGIN')
                                    if (passValid === pass) {
                                        await controller.generateToken(sequelize, username)
                                        res.json({loginSucesfull, "token": token})
                                        await controller.adminRol(sequelize, username)
                                        console.log(userRolValid,'ROL USER')
                                    }else{
                                        res.json({errorLogin})
                                    }
                            }else{
                                res.json({errorLogin})
                            }                                 
                        
                } catch (error) {                    
                    res.json({errorLogin})
                }
        })


        .post('/login/protected', tokenAuthentication.loginAuthentication ,(req, res) => {
            res.json({messagge: 'THIS IS AN AUTHENTICATED PAGE'})
        })

        
        

        
        

module.exports = router