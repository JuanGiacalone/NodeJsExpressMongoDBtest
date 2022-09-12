import express from 'express'
import { faroModel,puntoModel } from '../models/Faro.js';
const farosRouter = express.Router();

// GET para todos los faros
farosRouter.get('/all', async (req, res) => {
  try {

    // Implementacion de mongoose incluida con sus models
    const faros = await faroModel.find();
    res.json(faros);

  } catch (error) {

    res.json( { message: error })

  }
});

// GET para un faro
farosRouter.get('/:idFaro', async (req, res) => {
  try {

    const faro = await faroModel.findOne({idFaro: req.params.idFaro});


    // Verifico que exista el faro
    faro ? res.json(faro) : res.json({"message": 'No se existe faro con idFaro:'+ (req.params.idFaro)});

  } catch (error) {

    res.json( { message: error })

  }
});

// POST - Agregar un faro
farosRouter.post('/add', async (req, res) => { 

    // Instanciacion de los modelos y asignacion de campos de la req.
    // GEOJSON requiere los campos type = Point y coordinates
    const punto = new puntoModel ({
      type: req.body.coordenadas.type,
      coordinates: req.body.coordenadas.coordinates
    })
    const faro = new faroModel ({
      idFaro: req.body.idFaro,
      nombre: req.body.nombre,
      coordenadas: punto,
      comentarios: req.body.comentarios
    })

    try {
      // Guardado del faro
      const savedFaro = await faro.save();

      // Mensaje segun el exito del guardado
      savedFaro ? res.json(savedFaro) : res.json('No se pudo guardar el faro')

    } catch (error) {
      res.json( { message: error })
    }
    
})

// Agrega un comentario al faro y devuelve los comentarios actualizado
farosRouter.post('/addComment/:idFaro', async (req, res) => {
  try {
    // Funcion para agregar un comentario a el faro con el idFaro que entra como param
    // findOneAndUpdate ({filtro}, {comentario que se agrega}, {opcion "new:true" para que retorne el array })
    const nuevoComentario = await faroModel.
                                            findOneAndUpdate(
                                              {idFaro: req.params.idFaro}, 
                                              {$addToSet: {comentarios: req.body.comentarios}},
                                              {new:true});
    console.log(nuevoComentario);
    // Verifico que exista el idFaro
    if (nuevoComentario) {
      console.log('aca llega');
      // Ubico el indice del comentario insertado
      const indexUltimoComentario = nuevoComentario.comentarios.length;
      // Envio el comentario insertado
      res.json(nuevoComentario.comentarios[indexUltimoComentario-1]);
      
      // Si no existe...
    } else res.json( { message: 'No existe el idFaro:' + (req.params.idFaro)});

  } catch (error) {

    res.json( { message: error })

  }
});

export {farosRouter};


