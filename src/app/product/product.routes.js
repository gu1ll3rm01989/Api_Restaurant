const sequelize = require('../db.conection')
const express = require('express')
const router = express.Router()
const DbQuerys = require ('./product.controller')

const errorMessage = 'An error has occurred, please try again or contact the administrator'


router 
        .get('/products', async (req, res) =>{
                try {
                        const products = await DbQuerys.getAllProducts(sequelize)
                        res.status(200).json(products)
                } catch (error) {
                        res.json(error,'An error has occurred')
                }            
        })

        .post('/products', async (req, res) =>{
                try {
                        const product = req.body
                        await DbQuerys.insertNewProduct(sequelize, product)
                        res.status(200).json({message: 'Successful application, the PRODUCT has been CREATED'})            
                } catch (error) {
                        res.json(error,'An error has occurred')
                }
        })

        .put('/products/:id', async (req, res) => {
                try {
                const id = req.params.id
                if (!isNaN(id)) {
                        try {
                                const productData = req.body
                                console.log(productData)
                                
                                if (Object.values(productData).length > 0) {
                                        await DbQuerys.updateProductByID(sequelize, id, productData)
                                        res.status(200).json({message: 'Successful application, the PRODUCT has been UPDATED'})
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
                } catch (error) {
                        res.json(error,'An error has occurred')
                }
        })

        .delete('/products/:id', async (req, res) => {
                try {
                        const id = req.params.id
                        if (!isNaN(id)) {
                                try {
                                        await DbQuerys.deleteProductById(sequelize, id)
                                        res.status(200).json({message: 'Successful application, the PRODUCT has been DELETED'})
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