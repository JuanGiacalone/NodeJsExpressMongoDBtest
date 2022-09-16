import express from 'express'
import mongoose from 'mongoose'
import ServerApiVersion from 'mongoose'
import dotenv from 'dotenv/config'
import cors from 'cors';

// Seteo de puertos y base a utilizar
const PUERTO = process.env.PUERTO || 3000;
const DB = 'farosArg_test3'

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
import bodyParser from 'body-parser';

// Creo middleware para el parser de los cuerpos q se utilizen

app.use(bodyParser.json());

// Middleware para poder ejecutar las peticiones desde cualquier sitio usando cors

 app.use(cors());

// Indexo el middleware para /faros y /comments a su ruta

app.use('/faros',farosRouter);
// app.use('/comentarios',comentariosRouter);


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
    err ?  console.log(err) : console.log(`BD ${DB} connectada`,);
} )


// Set el puerto de escucha 

app.listen(PUERTO);



