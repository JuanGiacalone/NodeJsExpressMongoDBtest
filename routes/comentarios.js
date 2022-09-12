import express from 'express';
const comentariosRouter = express.Router();
import {commentModel} from '../models/Comment.js'
import mongoose from 'mongoose'


 comentariosRouter.get('/', (req, res) => {
  res.send('lo comentario') 
});

  comentariosRouter.post('/add', async (req, res) => {

    console.log(req.body.name);

  const comment = new commentModel({
    name: req.body.name,
    body: req.body.body
  })

  try {
    await comment.save();

  } catch (error) {
    res.json( { messasge: error })
  }
    
});

export {comentariosRouter}



