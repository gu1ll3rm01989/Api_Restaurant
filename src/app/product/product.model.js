class Product {
    constructor (name, price, id = null){
        this.id = id
        this.name = name
        this.price = price
    }
}

module.exports = Product