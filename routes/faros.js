import express from 'express'
import { comentarioModel } from '../models/Comentario.js';
import { eliminaDocComentario } from './comentarios.js';
import { faroModel } from '../models/Faro.js';
const farosRouter = express.Router();

// GET para todos los faros
farosRouter.get('/', async (req, res) => {
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
    faro ? res.json(faro) : res.json({"message": 'No existe faro con idFaro:'+ (req.params.idFaro)});

  } catch (error) {

    res.json( { message: error })

  }
});

// POST - Agregar un faro
farosRouter.post('/', async (req, res) => { 

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
        coordenadas: {type: req.body.coordenadas.type, coordinates: req.body.coordenadas.coordinates},
      })
      
      // Guardado del faro
      try {
        
        const savedFaro = await faro.save();

        // Si se crea exitosamente, envia el faro guardado y crea un Documento tipo Comentario con los comentarios para ese faro
        if (savedFaro)  {
          creaComment(savedFaro.idFaro);
          res.json(savedFaro)

                  // Mensaje segun el exito del guardado
        } else res.json({messagge:'No se pudo guardar el faro'})

      } catch (error) {
        res.json( { message: error })
      }
    } 
  })
async function creaComment(idFaro) {
  const comentario = new comentarioModel({idFaro: idFaro})
  
  return await comentario.save();
}

farosRouter.delete('/:idFaro', async (req, res) => {
 
  try {
     // Verifico que exista el id faro
  const faroExiste = await faroModel
  .findOne({idFaro: req.params.idFaro})
  .select('idFaro');

    if(!faroExiste) {
    res.json({"message": 'No existe faro con idFaro:'+ (req.params.idFaro)})
    } else {
    
    // Elimina el faro segun el idFaro ingresado por parametro
    let faroAEliminar = await faroModel.deleteOne({ idFaro : req.params.idFaro})

    // Elimina el comentario segun el idFaro ingresado, se utiliza un metodo del archivo comentarios.js
    let comentarioAEliminar = await eliminaDocComentario(req.params.idFaro)

    // Si ambos deletedcount son igual a 1, se elimina correctamente el faro; si esto no ocurre, se devuelve el resultado obtenido 
    faroAEliminar.deletedCount && comentarioAEliminar.deletedCount ? 
    res.json( { message:'Se elimino el faro con idFaro: ' + req.params.idFaro + ' y su documento de comentarios'}) :
    res.json( { message:'DeletedCount del faro: ' + faroAEliminar.deletedCount + ' | DeletedCount del doc. comentario: ' + comentarioAEliminar.deletedCount,
   explanation: '1 Significa que se elimino y 0 que no se elimino (puede ser que no exista)'})

   }
} catch (error){ res.json({ messagge: error }) }

})





export {farosRouter};


