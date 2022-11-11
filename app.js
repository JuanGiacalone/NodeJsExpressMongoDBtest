import express from 'express'
import mongoose from 'mongoose'
import ServerApiVersion from 'mongoose'
import bodyParser from 'body-parser';
import dotenv from 'dotenv/config'
import cors from 'cors';

// Seteo de puertos y base a utilizar
const PORT = process.env.APP_PORT || 3000;
const DB = 'farosArg_testv4'

// Se define el modelo para guardar el documento auth
const Auth = mongoose.model('Auth', { secret: String })

// Se define una promesa a resolver. Realiza una peticion a la base en busqueda del secreto
const secretPromise = new Promise((resolve,rej) => {
    setTimeout(() => {
        resolve(
            Auth.findOne()
        )
        }, 3000);
})

// Una vez resulta la promesa, se almacena el secreto, este puede existir o no. Depende de si se ha inicializado la app
// utilizando el endpoint /init
export var secret = secretPromise.then((response) =>{
    console.log('AUTH -> SecretPromise solved ✔')
    if(response) {
        secret = response.secret
        console.log('AUTH -> Running with Secret ✔');
    } else {
        secret = undefined
        console.log('AUTH -> Running with no Secret 📛');
    }
})
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



// Middleware parser para los cuerpos q se utilizen

app.use(bodyParser.json());

// Middleware para poder ejecutar las peticiones desde cualquier sitio usando cors
app.use(cors());

// Indexacion del middleware para /faros y /comments a su ruta

app.use('/faros',farosRouter);
app.use('/comentarios',comentariosRouter);


// Endpoint de inicializacion de autenticacion basica, en caso de no existir se acepta un usuario y contrasenia
// en formato: Basic xxxxxxxx
app.post('/auth-init', async (req,res) => {

    // Si no existe un secreto, se acepta el recibido
    if(!secret) {
        const authToSave = new Auth ({secret: req.headers.authorization})
        await authToSave.save().then(() => res.json({message: 'Auth saved! Write down the sent credentials!'}))
        secret = req.headers.authorization
    } else {
        // Si ya existe se rechaza la solicitud
            res.json({message: 'The app has already a secret! (Already initialized)'})
        }
})


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
        err ?  console.log(err + ' ❌ ') : console.log(`DB -> Connected to ${DB} ✔`,);
} )


// Configuracion del el puerto de escucha
app.listen(PORT);
console.log('APP -> Running on port : '+ PORT + ' ✔');


