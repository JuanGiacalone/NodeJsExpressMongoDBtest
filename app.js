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
import farosRoute from './routes/faros.js'
import comentariosRoute from './routes/comentarios.js'

// Indexo el middleware para /faros a su ruta

app.use('/faros',farosRoute);
app.use('/comentarios',comentariosRoute);


// Conexion a BD

mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log('DB connecteds');
} )


// Set el puerto de escucha 
app.listen(PUERTO);



