class Order {
    constructor(username, name_product, quantity, payment_id, total, state_id = 1, id = null){
        this.id = id
        this.username = username
        this.name_product = name_product
        this.quantity = quantity
        this.payment_id = payment_id
        this.total = total
        this.state_id = state_id
        

    }
}

module.exports = Order