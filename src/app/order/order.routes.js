const sequelize = require ('../db.conection')
const express = require ('express')
const router = express.Router()
const controller = require ('./order.controller')

const errorMessage = 'An error has occurred. Some of the data entered is incorrect'
const okMessage = 'Successful application, the ORDER has been CREATED'

router
        .post('/order', async (req, res) =>{
                try {
                        const order = req.body
                        await controller.insertNewOrder(sequelize, order)

                        await controller.showOrder(sequelize)

                        const {username} = req.body
                        await controller.orderStatusUsername(sequelize,username)

                        const {name_product} = req.body
                        await controller.orderStatusProduct(sequelize, name_product)

                        if (username == userNameValid[0] && name_product == productNameValid[0] ) {
                            res.status(200).json({order_new, message: okMessage})
                        } else {
                            res.status(500).json({error: errorMessage})
                        }
                        
                } catch (error) {
                    res.status(500).json({error: errorMessage})
                }
        })

        .put('/order/:id', async (req, res) => {
                        const id = req.params.id
                        console.log(id)
                        if (!isNaN(id)) {
                                try {   
                                        const state = req.body
                                        if (Object.values(state).length > 0) {
                                            await controller.updateStateOrderByID(sequelize, id, state)
                                            res.status(200).json({message: 'Successful application, the STATE has been UPDATED'})
                                } 
                            }
                            catch (error) {
                                    res.sendStatus(500).json({ message: errorMessage })
                                }
                        } else {
                            res.status(400).json({message:'Id must be a number'})
                            console.log('Id must be a number')
                        }                   
        })

        .delete('/order/:id', async (req, res) => {
                try {
                        const id = req.params.id
                        if (!isNaN(id)) {
                                try {
                                            await controller.deleteOrderById(sequelize, id)
                                            res.status(200).json({message: 'Successful application, the ORDER has been DELETED'})
                                } catch (error) {
                                    res.sendStatus(500).json({ message: errorMessage })    
                                }   
                        } else {
                            res.status(400).json({message:'Id must be a number'})
                            console.log('Id must be a number')
                        }
                } catch (error) {
                    res.json(error,'An error has occurred')
                }
        })

module.exports = router