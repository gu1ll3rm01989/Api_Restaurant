# Api Restaurant

## Proyecto Delilah Restó
Delilah Restó es una API desarrollada para el ultimo proyecto de la carrera de Desarrollo Web Full Stack en Acámica.

### Técnologias implementadas
- Node.js
- Express.js
- SQL
- Sequelize
- JWT
- GIT para el control de versiones
- Swagger Editor

___
___

## Prueba de la API

1.  Clonar o descargar el repositorio 

2.  Entrar en la carpeta raiz y dirigirse a la carpeta 'base de datos' copiar el script del archivo 'DelilahDB'.

3.  Crear la base de datos y ejecutar un motor de base de datos.
4.  Abrir terminal e instalar las dependencias del proyecto con 'npm i' para poder probar los endpoint.

5.  Ejecutar el comando 'npm start' para iniciar el servidor, deberia esperar un mensaje como este:   
""DATABASE CONNECTION has been established
SUCCESSFULLY   
API REST   
SERVER is RUNNING at PORT 3000!!!""

6.  Usar alguna herramienta que nos permita probar los endpoint con sus respectivos metodos, como por ejemplo POSTMAN o INSOMNIA.
___
___


##  API Endpoints

1.   CREAR EL USUARIO 
     
#### POST /api/v1/users

Ejemplo de cuerpo de la peticion  
Indicando rol : (1: Admin, 2: User)
~~~
{  
        "fullname": "Jhon Doe",  
        "mail": "jhondoe@mail",  
        "phone": 963258,  
        "address": "Av. Colon 200",  
        "username": "jhon",  
        "pass": "123",  
        "rol": 1                
}
~~~

Ejemplo de respuesta de la peticion

~~~
{
    "message": "Successful application, the USER has been CREATED"
}
~~~

2. INGRESAR COMO USUARIO

#### POST /api/v1/login

Ejemplo de cuerpo de la peticion  
~~~
{  
        "username": "jhon",
	    "pass": "123"                
}
~~~

Ejemplo de respuesta de la peticion

~~~
{
    "loginSucesfull": "Login User",
    "token": "Ejemplo de token qwr54er65s4yh6rh6dsF"
}
~~~

3. VALIDARSE COMO USUARIO

#### POST /api/v1/login/protected

Enviar la cabecera de la peticion, en "KEY"  colocar "Authorization" y en "VALUE" colocar  "Bearer "Ejemplo de token"" dado en el endpoint anterior.

Ejemplo de respuesta de la peticion

~~~
{
    "messagge": "THIS IS AN AUTHENTICATED PAGE"
}
~~~   
   
4. MOSTRAR USUARIOS PARA CUALQUIER ROL

#### GET /api/v1/users

Ejemplo de respuesta de la peticion

~~~
[
    {
        "user_id": 25,
        "user_fullname": "Jhon Doe",
        "user_mail": "jhondoe@mail.com",
        "user_phone": 96325871,
        "user_address": "Colon 200",
        "user_username": "jhon",
        "user_pass": "123",
        "rol_id": 1
    },
    {
        "user_id": 26,
        "user_fullname": "Fulanito",
        "user_mail": "fulano@mail.com",
        "user_phone": 74125896,
        "user_address": "Maipu 500",
        "user_username": "fulano",
        "user_pass": "321",
        "rol_id": 2
    },
    {
        "user_id": 28,
        "user_fullname": "pepe",
        "user_mail": "pepe@mail",
        "user_phone": 963258,
        "user_address": "Chaca 960000",
        "user_username": "pepe",
        "user_pass": "123",
        "rol_id": 2
    }
]
~~~

5. MODIFICAR USUARIOS PARA ROL ADMINISTRADOR   
Previamente ingresar con usuario que tenga rol de administrador (1) Ver punto 2

#### PUT /api/v1/users/{user_id}

Ejemplo de cuerpo de la peticion  

~~~
{  
        "fullname": "Jhon Doe",  
        "mail": "jhondoe@mail",  
        "phone": 963258,  
        "address": "Av. Colon 200",  
        "username": "jhon",  
        "pass": "123",  
        "rol": 1                
}
~~~

Ejemplo de respuesta de la peticion

~~~
{
    "message": "Successful application, the USER has been UPDATED"
}
~~~


6. ELIMINAR USUARIOS PARA ROL ADMINISTRADOR   
Previamente ingresar con usuario que tenga rol de administrador (1) Ver punto 2

#### DELETE /api/v1/users/{user_id}


Ejemplo de respuesta de la peticion

~~~
{
    "message": "Successful application, the USER has been DELETED"
}
~~~

7. MOSTRAR PRODUCTOS PARA CUALQUIER ROL

#### GET /api/v1/products

Ejemplo de respuesta de la peticion

~~~
[
    {
        "product_id": 1,
        "product_name": "Hamburguesa",
        "product_price": 150
    },
    {
        "product_id": 2,
        "product_name": "Lomito",
        "product_price": 250
    },
    {
        "product_id": 3,
        "product_name": "Pizza",
        "product_price": 200
    }
]
~~~

8. CREAR UN PEDIDO

#### POST /api/v1/order

Ejemplo de cuerpo de la peticion  

~~~
{  
        "username": "jhon",
	    "name_product": "Hamburguesa",
	    "quantity": 4,
	    "payment_id": 1                
}
~~~

Ejemplo de respuesta de la peticion

~~~
{  
        "order_new": {
            "order_id": 27,
            "user_username": "jhon",
            "state_name": "Nuevo"
            },
        "message": "Successful application, the ORDER has been CREATED"                
}
~~~

9. MODIFICAR EL ESTADO DE UN PEDIDO PARA ROL DE ADMINISTRADOR  
Previamente ingresar con usuario que tenga rol de administrador (1) Ver punto 2

#### PUT /api/v1/order/{order_id}

Ejemplo de cuerpo de la peticion  

~~~
{  
        "state": "Entregado"              
}
~~~


Ejemplo de respuesta de la peticion

~~~
{  
        "message": "Successful application, the STATE has been UPDATED"               
}
~~~

10. CREACION DE PRODUCTOS PARA ROL DE ADMINISTRADOR  
Previamente ingresar con usuario que tenga rol de administrador (1) Ver punto 2
#### POST /api/v1/products

Ejemplo de cuerpo de la peticion  

~~~
{  
        "name": "Pizza",
	    "price":   200     
}
~~~

Ejemplo de respuesta de la peticion

~~~
{  
         "message": "Successful application, the PRODUCT has been CREATED"          
}
~~~

11. MODIFICACION DE PRODUCTOS PARA ROL DE ADMINISTRADOR  
Previamente ingresar con usuario que tenga rol de administrador (1) Ver punto 2

#### PUT /api/v1/products/{products_id}

Ejemplo de cuerpo de la peticion  

~~~
{  
        "name": "Lomito",
	    "price":   100     
}
~~~

Ejemplo de respuesta de la peticion

~~~
{  
         "message": "Successful application, the PRODUCT has been UPDATED"          
}
~~~

12. ELIMINAR PRODUCTOS PARA ROL DE ADMINISTRADOR  
Previamente ingresar con usuario que tenga rol de administrador (1) Ver punto 2

#### DELETE /api/v1/products/{products_id}


Ejemplo de respuesta de la peticion

~~~
{  
        "message": "Successful application, the PRODUCT has been DELETED"          
}
~~~