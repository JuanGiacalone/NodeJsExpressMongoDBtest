import express from 'express'
import mongoose from 'mongoose'
const authRouter = express.Router();

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
// Se exporta el secreto obtenido para que sea utilizado por las rutas
var secret = secretPromise.then((response) =>{
    console.log('AUTH -> SecretPromise solved ✔')
    if(response) {
        secret = response.secret
        console.log('AUTH -> Running with Secret ✔');
    } else {
        secret = undefined
        console.log('AUTH -> Running with no Secret 📛');
    }
})

// Endpoint de inicializacion de autenticacion basica, en caso de no existir se acepta un usuario y contrasenia usando el header autentication tipo Basic
// en formato: Basic xxxxxxxx
authRouter.post('/init', async (req,res) => {

    // Si no existe un secreto, se acepta el recibido
    if(!secret) {
        const authToSave = new Auth ({secret: req.headers.authorization})
        await authToSave.save().then(() => res.json({message: 'Auth saved! Write down the sent credentials!'}))
        secret = req.headers.authorization
        console.log('AUTH -> Auth just added, now running with a Secret ✔');
    } else {
        // Si ya existe se rechaza la solicitud
        res.json({message: 'The app has already a secret! (Already initialized)'})
    }
})

authRouter.get('/refresh', async (req,res) => {

    console.log('AUTH -> Refreshing auth...')
    try {
        let refreshSecretPromise = new Promise((resolve,rej) => {
            setTimeout(() => {
                resolve(
                        Auth.findOne()
                        )
            }, 3000);
        })

         refreshSecretPromise.then((response) =>{

            console.log('AUTH -> RefreshSecretPromise solved ✔')
            if(response) {
                secret = response.secret
                console.log('AUTH -> Running with Secret ✔');
            } else {
                secret = undefined
                console.log('AUTH -> Running with no Secret 📛');
            }

        })
        res.json({mesagge:'Secret status on refresh process!'})
    } catch (error) {
        res.json({message: error})
    }
})

authRouter.get('/reset', async (req,res) => {

    console.log('AUTH -> Resetting secret...')
    try {
        if (secret === undefined) {
            res.json({message:'There is no secret to reset'})
            console.log('AUTH -> Already running with no Secret 📛');
        } else {
            if ( (secret === req.headers.authorization)  ) {

                let resetSecretPromise = new Promise((resolve,rej) => {
                    setTimeout(() => {
                        resolve( Auth.deleteOne())}, 3000);
                })

                resetSecretPromise.then((response) =>{
                    console.log('AUTH -> ResetSecretPromise solved ✔')
                    if(response.deletedCount) {
                        secret = undefined
                        console.log('AUTH -> Secret reseted, running with no secret 📛');
                        res.json({message:'Secret succesfully reseted to default (no secret)'})
                    }})
            } else {
                console.log('AUTH -> Failed to authenticate request ❌');
                res.json({message: 'Credenciales incorrectas o inexistentes.'})
            }

        }

    } catch (error) {
        res.json(error)
    }
})


export {authRouter, secret}
