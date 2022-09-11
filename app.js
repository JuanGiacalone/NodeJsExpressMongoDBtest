import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv/config'

const PUERTO = 3000;

// Instacia de la App
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
import bodyParser from 'body-parser';


// Creo middleware para el parser de los cuerpos q se utilizen

app.use(bodyParser.json());


// Indexo el middleware para /faros y /comments a su ruta
app.use('/faros',farosRouter);
app.use('/comentarios',comentariosRouter);


// Conexion a BD

mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log('DB connecteds');
} )


// Set el puerto de escucha 
app.listen(PUERTO);



