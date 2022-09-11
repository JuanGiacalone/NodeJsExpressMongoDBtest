import express from 'express'
import { faroModel,puntoModel } from '../models/Faro.js';
const farosRouter = express.Router();


farosRouter.get('/', (req, res) => {
  res.send('lo faro') 
});

farosRouter.post('/add', async ( req, res) => { 

    const punto = new puntoModel ({
      type: req.body.coordenadas.type,
      coordenadas: req.body.coordenadas.coordenadas
    })
    const faro = new faroModel ({
      idFaro: req.body.idFaro,
      nombre: req.body.nombre,
      coordenadas: punto
    })

    try {
      const savedFaro = await faro.save();
      if (savedFaro) {res.status(200).json(savedFaro)}
    } catch (error) {
      res.json( { message: error })
    }
    
   
})

export {farosRouter};


