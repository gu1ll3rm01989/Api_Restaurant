
const rolAuthentication = (req, res, next) => {
        try {
            console.log('ENTRA AL ROLLLLLLLLLLLLLLLLLL')
            console.log(req.path)
            console.log(req.method)

            if (req.path === '/api/v1/users' && req.method === 'POST') {
                console.log('REGISTRARSE')
                next() 
                return
                }

            if (req.path === '/api/v1/products' && req.method === 'GET') {
                console.log('VER PRODUCTOS')
                next()
                return
                }

            if (req.path === '/api/v1/order' && req.method === 'POST') {
                console.log('VER PRODUCTOS')
                next()
                return
                }

                const rol = userRolValid

            if (rol != 1) {
                    res.send('NO TIENE PERMISO PARA REALIZAR LA TAREA')
                }
                    else{
                        next()
                    }

            
        } catch (error) {
            res.send(error)
        }
}


module.exports = rolAuthentication