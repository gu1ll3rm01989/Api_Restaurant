class User {
    constructor (fullname, mail, phone, address, username, pass, rol, id = null){
        this.id = id
        this.fullname = fullname
        this.mail = mail
        this.phone = phone
        this.address = address
        this.username = username
        this.pass = pass
        this.rol = rol
    }
}

module.exports = User