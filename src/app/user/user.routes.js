const sequelize = require ('../db.conection')
const express = require('express')
const router = express.Router()
const DbQuerys = require ('./user.controller')

const errorMessage = 'An error has occurred, please try again or contact the administrator'

router
        .get('/users', async (req, res) =>{
                try {
                        const users = await DbQuerys.getAllUsers(sequelize)
                        res.status(200).json(users) 
                } catch (error) {
                        res.status(500).json({error: errorMessage})
                }
        })

        .post('/users', async (req, res) =>{
                try {
                        const user = req.body
                        await DbQuerys.insertNewUser(sequelize, user)
                        res.status(200).json({message: 'Successful application, the USER has been CREATED'})        
                } catch (error) {
                        res.status(500).json({error: errorMessage})
                }
        })

        .put('/users/:id', async (req, res) =>{
                const id = req.params.id

                if (!isNaN(id)) {
                        try {
                                const userData = req.body
                                if (Object.values(userData).length > 0) {
                                        await DbQuerys.updateUserByID(sequelize, id, userData)
                                        res.status(200).json({message: 'Successful application, the USER has been UPDATED'})
                                } else {
                                        res.sendStatus(400)
                                }
                        } catch (error) {
                                res.sendStatus(500).json({ message: errorMessage })
                        }
                        
                } else {
                        res.status(400).json({message:'Id must be a number'})
                        console.log('Id must be a number')
                }
        })

        .delete('/users/:id', async (req, res) => {
                const id = req.params.id
                if (!isNaN(id)) {
                        try {
                                await DbQuerys.deleteUserById(sequelize, id)
                                res.status(200).json({message: 'Successful application, the user has been DELETED'})
                        } catch (error) {
                                res.sendStatus(500).json({ message: errorMessage })
                        }
                } else {
                        res.status(400).json({message:'Id must be a number'})
                        console.log('Id must be a number')
                }
        })



module.exports = router