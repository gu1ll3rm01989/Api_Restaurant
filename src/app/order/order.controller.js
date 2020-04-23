const Order = require ('./order.model')


    const insertNewOrder = async (sequelize,{username, name_product, quantity, payment_id}) => {
        try {
            
            const productPriceQuery = await sequelize.query (`SELECT product_price FROM delilah.product WHERE product_name = '${name_product}';`,
                { type: sequelize.QueryTypes.SELECT})
            const userNameQuery = await sequelize.query (`SELECT user_username FROM delilah.user WHERE user_username = '${username}';`,
                { type: sequelize.QueryTypes.SELECT})
            const userIdQuery = await sequelize.query (`SELECT user_id FROM delilah.user WHERE user_username = '${username}';`,
            { type: sequelize.QueryTypes.SELECT})
            const productIdQuery = await sequelize.query (`SELECT product_id FROM delilah.product WHERE product_name = '${name_product}';`,
            { type: sequelize.QueryTypes.SELECT})
            const productNameQuery = await sequelize.query (`SELECT product_name FROM delilah.product WHERE product_name = '${name_product}';`,
            { type: sequelize.QueryTypes.SELECT})
            
            
            const productPrice = Object.values(productPriceQuery[0])
            const userNameValid = Object.values(userNameQuery[0])
            const userIdValid = Object.values(userIdQuery[0])
            const productIdValid = Object.values(productIdQuery[0])
            const productNameValid = Object.values(productNameQuery[0])
            
                    if (username == userNameValid && name_product == productNameValid ) {
                        console.log('ADENTROOOOOOOOOOOO')
                        const total = productPrice * quantity
                        const order = new Order (username, name_product, quantity, payment_id)
                        const inserQueryOrder ='INSERT INTO delilah.order (user_id, product_id, order_quantity, order_total, payment_id, state_id) VALUES (?,?,?,?,?,?);'
                        await sequelize.query(inserQueryOrder,
                            { replacements: [userIdValid, productIdValid, order.quantity, total, payment_id, order.state_id ]})                        
                            
                    } else {
                        console.log('ERROR')
                    }
                
        } catch (error) {
            
        }
    }

    const orderStatusUsername = async (sequelize, username) => {
            try {
                const userNameQuery = await sequelize.query (`SELECT user_username FROM delilah.user WHERE user_username = '${username}';`,
                { type: sequelize.QueryTypes.SELECT})
                userNameValid = Object.values(userNameQuery[0])
                
                return userNameValid

            } catch (error) {
                
            }
    }

    const orderStatusProduct = async (sequelize, name_product) => {
        try {
            const productNameQuery = await sequelize.query (`SELECT product_name FROM delilah.product WHERE product_name = '${name_product}';`,
            { type: sequelize.QueryTypes.SELECT})
            
            productNameValid = Object.values(productNameQuery[0])
            
            return productNameValid

        } catch (error) {
            
        }
    }

    const updateStateOrderByID = async (sequelize, id, state) => {
        try {
                stateOrder = Object.values(state)
                stateOrderValid = stateOrder[0]
                console.log(stateOrderValid)
                let idState
                if (stateOrderValid == 'Confirmado') {
                    console.log('CONFIRMADO')
                    idState = 2
                }
                if (stateOrderValid == 'Preparando') {
                    console.log('PREPARANDO')
                    idState = 3
                }
                if (stateOrderValid == 'Enviando') {
                    console.log('ENVIANDO')
                    idState = 4
                }
                if (stateOrderValid == 'Entregado') {
                    console.log('ENTREGADO')
                    idState = 5
                }

                await sequelize.query(`UPDATE delilah.order SET state_id = ? WHERE order_id = ?;`,
                {replacements: [idState, id]})
                
            
        } catch (error) {
            console.log('ERROR: ' + error)
        }
    }
    

    const showOrder = async (sequelize) => {
        try {
            const orderId = await sequelize.query (`SELECT o.order_id, u.user_username, s.state_name FROM delilah.order as o 
            JOIN delilah.user as u ON u.user_id = o.user_id
            JOIN delilah.state as s ON s.state_id = o.state_id
            ORDER BY o.order_id DESC`,
            {type: sequelize.QueryTypes.SELECT}) 
            order_new = orderId[0]
            return order_new
        } catch (error) {
            
        }
    }

    const deleteOrderById = async (sequelize, id) => {
        try {
            await sequelize.query(`DELETE FROM delilah.order WHERE order_id = ?`,
            {replacements: [id]})
        } catch (error) {
            console.log('ERROR: ' + error)
        }
    }



module.exports = {
    insertNewOrder,
    orderStatusUsername,
    orderStatusProduct,
    updateStateOrderByID,
    showOrder,
    deleteOrderById
}