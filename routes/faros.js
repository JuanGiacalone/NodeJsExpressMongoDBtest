import express from 'express'
import { comentarioModel } from '../models/Comentario.js';
import { faroModel,puntoSchema } from '../models/Faro.js';
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
        coordenadas: {type: req.body.coordenadas.type, coordinates: req.body.coordenadas.coordinates},
      })
      
      // Guardado del faro
      try {
        
        const savedFaro = await faro.save();

        // Si se crea exitosamente, envia el faro guardado y crea un Documento tipo Comentario con los comentarios para ese faro
        if (savedFaro)  {
          creaComment(savedFaro._id);
          res.json(savedFaro)

                  // Mensaje segun el exito del guardado
        } else res.json({messagge:'No se pudo guardar el faro'})

      } catch (error) {
        res.json( { message: error })
      }
    } 
  })
async function creaComment(_idFaro) {
  const comentario = new comentarioModel({_idFaro: _idFaro})
  
  return await comentario.save();
}
// Agrega un comentario al faro y devuelve los comentarios actualizado
// farosRouter.post('/addComment/:idFaro', async (req, res) => {
//   try {
//     // Funcion para agregar un comentario a el faro con el idFaro que entra como param
//     // findOneAndUpdate ({filtro}, {comentario que se agrega}, {opcion "new:true" para que retorne el array })
//     const nuevoComentario = await faroModel.
//                                             findOneAndUpdate(
//                                               {idFaro: req.params.idFaro}, 
//                                               {$addToSet: {comentarios: req.body.comentarios}},
//                                               {new:true})
//                                               .select('comentarios'); // Solo devuelve el array de comentarios 
                                                                                     
    
//     // Verifico que exista el idFaro
//     if (nuevoComentario) {
      
//       // Ubico el indice del comentario insertado
//       const indexUltimoComentario = nuevoComentario.comentarios.length;
//       // Envio el comentario insertado
//       res.json(nuevoComentario.comentarios[indexUltimoComentario-1]);
      
//       // Si no existe...
//     } else res.json( { message: 'No existe faro con idFaro:' + (req.params.idFaro)});

//   } catch (error) {

//     res.json( { message: error })

//   }
// });




export {farosRouter};


