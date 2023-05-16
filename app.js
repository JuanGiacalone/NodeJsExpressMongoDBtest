import express from 'express'
import mongoose from 'mongoose'
import ServerApiVersion from 'mongoose'
import bodyParser from 'body-parser';
import dotenv from 'dotenv/config'
import cors from 'cors';

// Seteo de puertos y base a utilizar
const PORT = process.env.APP_PORT || 3000;
const DB = 'farosArg_01'

// Instancia de la App
const app = express();

// Middleware -> se ejecutan cuando se hace una pegada a cierta ruta
// En este caso se ejecutara una funcion cuando se solicite /faros
// app.use('/faros', () => {
//     console.log('middleware');
// } )

// app.use(auth)... en este caso al usar cualquier ruta, se realiza un auth..

// Rutas importadas
import {farosRouter} from './routes/faros.js'
import {comentariosRouter} from './routes/comentarios.js'
import { publicidadesRouter } from './routes/publicidades.js'
import {authRouter, secret} from './routes/auth.js'


// Middleware parser para los cuerpos q se utilizen

app.use(bodyParser.json())

// Middleware para poder ejecutar las peticiones desde cualquier sitio usando cors
app.use(cors())

// Indexacion del middleware para /faros y /comments a su ruta

app.use('/faros',farosRouter)
app.use('/comentarios',comentariosRouter)
app.use('/auth',authRouter)
app.use('/publicidades', publicidadesRouter)



// Conexion a BD

mongoose.connect(
    process.env.DB_CONNECTION,
    {
        dbName: DB,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1
      }, 
    (err) => {
        err ?  console.log(err + ' ❌ ') : console.log(`DB -> Connected to ${DB} ✔`,)
} )


// Configuracion del el puerto de escucha
app.listen(PORT)
console.log('APP -> Running on port : '+ PORT + ' ✔')


