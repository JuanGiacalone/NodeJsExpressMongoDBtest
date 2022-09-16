import express from 'express'
import apicache from 'apicache'
// import { comentarioModel, comentarioSchema } from '../models/Comentario.js';
// import { puntoModel, puntoSchema} from '../models/Punto.js'
import { faroModel } from '../models/Faro.js';
import { Query } from 'mongoose';

const farosRouter = express.Router();

const cache = apicache.middleware;

// cache("10 minutes")
// GET para todos los faros
farosRouter.get('/all/:sinComentarios?', async (req, res) => {
  try {
    if (req.params.sinComentarios == "sincom") {

      const faros = await faroModel.find().slice('comentarios',0);
      res.json(faros);

    } else {
          // Implementacion de mongoose incluida con sus models
      const faros = await faroModel.find();
      res.json(faros);
    }


  } catch (error) {

    res.json( { message: error })

  }
});

// GET para un faro
farosRouter.get('/:idFaro/:sinComentarios?', async (req, res) => {
  try {
  
    console.log(req.params.sinComentarios);
    if (req.params.sinComentarios == "sincom") {

      // Para alivianar la peticion se puede obtener el faro sin los comentarios
      
      const faro = await faroModel.findOne({idFaro: req.params.idFaro}).slice("comentarios", 0)
      // Verifico que exista el faro
      faro ? res.json(faro) : res.json({"message": 'No existe faro con idFaro:'+ (req.params.idFaro)});

    } else {

      const faro = await faroModel.findOne({idFaro: req.params.idFaro})
      // Verifico que exista el faro
      faro ? res.json(faro) : res.json({"message": 'No existe faro con idFaro:'+ (req.params.idFaro)});
    }
      
  } catch (error) {

    res.json( { message: error })

  }
});

// GET para todos los comentarios de un faro
farosRouter.get('/comentarios/:idFaro', async (req, res) => {
  try {

    const faro = await faroModel.findOne({idFaro: req.params.idFaro}).select('comentarios');

    // Verifico que exista el faro
    faro ? res.json(faro) : res.json({"message": 'No existe faro con idFaro:'+ (req.params.idFaro)});

  } catch (error) {

    res.json( { message: error })

  }
});





// POST - Agregar un faro
farosRouter.post('/add', async (req, res) => { 

    // Verifico que no exista el id faro
   const faroExiste = await faroModel
                      .findOne({idFaro: req.body.idFaro})
                      .select('idFaro');

    // Si existe ese idFaro, no se inserta
    if(faroExiste) { res.json({messagge:'El faro con idFaro: ' + faroExiste.idFaro + ' ya existe!'}) } 
    else { 
    
      // Se Instancian los modelos y se asignan los campos de la req.
      // GEOJSON requiere los campos type = Point y coordinates



      const faro = new faroModel ({
        idFaro: req.body.idFaro,
        nombre: req.body.nombre,
        coordenadas: {type: req.body.coordenadas.type,
                      coordinates: req.body.coordenadas.coordinates},
        comentarios: req.body.comentarios  
      })
            
      // Guardado del faro
      try {
        
        const savedFaro = await faro.save();

        // Mensaje segun el exito del guardado
        savedFaro ? res.json(savedFaro) : res.json({messagge:'No se pudo guardar el faro'})

      } catch (error) {
        res.json( { message: error })
      }
    } 
  })


// POST Agrega un comentario al faro y devuelve los comentarios actualizado
farosRouter.put('/addComment/:idFaro', async (req, res) => {
  try {

    // Funcion para agregar un comentario a el faro con el idFaro que entra como param
    // findOneAndUpdate ({filtro}, {comentario que se agrega}, {opcion "new:true" para que retorne el array })

    const nuevoComentario = await faroModel.
                                            findOneAndUpdate(
                                              {idFaro: req.params.idFaro}, 
                                              {$addToSet: {comentarios: req.body.comentarios}},
                                              {new:true, comentarios:{ $slice: -1}}).select('comentarios')
                                              //.select('comentarios'); // Solo devuelve el array de comentarios 
                                                                                     
    console.log(nuevoComentario);
    // Verifico que exista el idFaro, si no existe el FindOneAndUpdate falla y devuelve undefined...
    if (nuevoComentario) {
      
      // Ubico el indice del comentario insertado
      const indexUltimoComentario = nuevoComentario.comentarios.length;
      // Envio el comentario insertado
      res.json(nuevoComentario.comentarios[indexUltimoComentario-1]);
      
      // Si no existe...
    } else res.json( { message: 'No existe faro con idFaro:' + (req.params.idFaro)});

  } catch (error) {

    res.json( { message: error })

  }
});

export {farosRouter};


