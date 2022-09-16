import express from 'express';
const comentariosRouter = express.Router();
import {comentarioModel} from '../models/Comentario.js'
import mongoose from 'mongoose'


comentariosRouter.get('/', async (req, res) => {
  res.send( await comentarioModel.find()) 
});
comentariosRouter.get('/:idFaro', async (req, res) => {
 
  res.send( await comentarioModel.find({_idFaro: req.params.idFaro})) 
});



comentariosRouter.put('/add/:idFaro', async (req, res) => {

  // const comentarios = new comentarioModel({
  //   comentarios: req.body.comentarios
  // })

  try {
    const nuevoComentario = await comentarioModel.findOneAndUpdate(
      {_idFaro: req.params.idFaro}, 
      {$addToSet: {comentarios: req.body.comentarios}},
      {new:true})
    
    if (nuevoComentario) {
        // Ubico el indice del comentario insertado
        const indexUltimoComentario = nuevoComentario.comentarios.length;
        // Envio el comentario insertado
        res.json(nuevoComentario.comentarios[indexUltimoComentario-1]);
        
        // Si no existe...
      } else res.json( { message: 'No existe faro con idFaro:' + (req.params.idFaro)});} 
      
  catch (error) {
    res.json( { message: error })
  }
    
});

export {comentariosRouter}



