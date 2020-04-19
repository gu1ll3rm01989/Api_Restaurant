const Product = require ('./product.model')

const DbQuerys = {
    getAllProducts: async (sequelize) => {
        try {
            const products = await sequelize.query(`SELECT * FROM delilah.product`,
            { type: sequelize.QueryTypes.SELECT})
            return products
        } catch (error) {
            console.log('ERROR: ' + error)
        }
    },

    insertNewProduct: async (sequelize, {name, price}) => {
        try {
            const product = new Product (name, price)
            console.log(product)
            await sequelize.query(`INSERT INTO delilah.product (product_name, product_price) VALUES (?, ?);`,
            {replacements: [product.name, product.price]
            })
            return product
        } catch (error) {
            console.log('ERROR: ' + error)
        }
    },

    updateProductByID: async (sequelize, id, productData) => {
        try {
            for (const value in productData) {
    
                    await sequelize.query(`UPDATE delilah.product SET product_${value} = ? WHERE product_id = ?;`,
                    {replacements: [productData[value], id]
                    })
                }
        } catch (error) {
            console.log('ERROR: ' + error)
        }
    },

    deleteProductById: async (sequelize, id) => {
        try {
            await sequelize.query(`DELETE FROM delilah.product WHERE product_id = ?`,
            {replacements: [id]})
        } catch (error) {
            console.log('ERROR: ' + error)
        }
    }
}

module.exports = DbQuerys