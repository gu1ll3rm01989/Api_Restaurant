const config = {
    SERVER_PORT: process.env.PORT || 3000,
    DDBB: {
        NAME: 'delilah',
        USER: 'root',
        PASS: 'root',
        PORT: '3306',
        HOST: '127.0.0.1'
    },
    JWT: {
        PRIVATE_KEY: 'delilah',
        EXPIRES_TIME: 10
    }
}

module.exports= config