/*
1 iniciamos el proyecto con el comando pnm init -y
2 instalamos express con npm install express
3 corremos el servidor con node server.js 
4 como este paso es muy tedioso porque hay que correrlo por cada actualizacion ejecutaremos en la taerminar este comando para configurar el node:
5 npm i nodemon --save-dev lo instalamos como una dependencia de desarollo con --save-dev
6 ya instalado nodemon debemos cambiar algo en package.json en la parte del scrips // "start": "nodemon server.js", puede ser dev tambien 
7 en la primera seccion cambiamos main por main: "server.js" y guardamos los cambios
8 ejecutamos el nuevo comando para correr el servidor de nodemon con: npm run start
9 instalamos el modulo para usar el banco de mysql con el comando: npm i mysql express-myconnection // expressmycon... nos ayudara agilizar con express y mysql 
*/

const express = require('express') // constante para requerir el modulo de express
const mysql = require('mysql') // constante para requerir el modulo de mysql
const myconn = require('express-myconnection') // constante para requerir el modulo de my connection con express

const routes = require('./routes') //importamos con una constante las rutas del documento routes.js

const app = express() // constante para el metodo express para ejecutarlo 
app.set('port', process.env.PORT || 9000) // esta es la propiedad del puerto y aqui mejoramos la conexion settiando y le indicamos una variante de ambiente, esto es util para preparar
// el puerto, aparte si quieres cambiar de puerto aqui lo modificas y se cambia automaticamente en todas las partes que usaste el metodo app.get('port')

//creamos una constante para dar la configuracion a la base de daros mysql
const dbOptions = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'evaluacion1'
}

//hacemos la conexion a la base de satos indicandole parametros
app.use(myconn(mysql, dbOptions, 'single'))
app.use(express.json()) // agregamos esta extension para ver por la terminal los datos que incluimos en Json

app.get('/', (req, res) =>{
    res.send('welcome to my Api')
}) // aqui le agregamos una ruta para revisar si hay coneccion en la web y le entregamos un mensaje 

app.use('/api', routes) // ruta para importar la api desde routes.js

app.listen(app.get('port'), () => {  // aqui hacemos que el servidor escuche la conexion con este metodo "listen", obtenemos el puerto mediante el motod get
    console.log('server running on port', app.get('port')) // mostramos por consola que hay conexion y ademas le indicamos el puerto y lo corremos el servidor
}) 

// ya lista tpda la configuracion abrimos el navegador con localhost:9000