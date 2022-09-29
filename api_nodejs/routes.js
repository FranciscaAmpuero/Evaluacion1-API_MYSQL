/* 1- debemos tener instalado REST client para no usar postman 

*/

const express = require('express') // le asignamos una constante a express y requerimos el modulo express
const routes = express.Router() // asignamos una constante para descargar el modulo de express.Routes

routes.get('/', (req, res)=>{
    req.getConnection((err, conn) => {
        if(err) return res.send(err)

        conn.query('SELECT * FROM profesores', (err, rows) => {
            if(err) return res.send(err)

            res.json(rows)
        })

        })
    
}) //creamos una nueva ruta para la api, le ingresamos parametros para saber si hay un error y hacemos una consulta para mysql indicandole que me muestre todo lo que esta en la 
//tabla profesores y lo hacemos con dos if y me devuelve la informacion en pormato Json

routes.post('/', (req, res)=>{
    req.getConnection((err, conn) => {
        if(err) return res.send(err)        
       conn.query('INSERT INTO profesores set ?', [req.body], (err, rows) => {
            if(err) return res.send(err)

            res.send('El libro a sido insertado en la base de datos')
        })

        })
    }) // Creamos esta ruta con metodo post para agregar datos a la base de datos



    routes.delete('/:id', (req, res)=>{
        req.getConnection((err, conn) => {
            if(err) return res.send(err)        
           conn.query('DELETE FROM profesores WHERE id = ?', [req.params.id], (err, rows) => {
                if(err) return res.send(err)
    
                res.send('El profesor a sido eliminado de la base de datos')
            })
    
            })
        }) // con esta ruta eliminaremos un registro de la base de datos con su id en la url



        routes.put('/:id', (req, res)=>{
            req.getConnection((err, conn) => {
                if(err) return res.send(err)        
               conn.query('UPDATE profesores set ? WHERE id =?', [req.body,req.params.id], (err, rows) => {
                    if(err) return res.send(err)
        
                    res.send('Los datos del profesor a sido actualizado')
                })
        
                })
            }) // aqui podremos actualizar un registro de la base de datos



    module.exports = routes // con esto podremos exportar el routes.js completo a otros lugares