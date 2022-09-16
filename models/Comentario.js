import mongoose from 'mongoose'

const comentarioSchema = mongoose.Schema({
    
  _idFaro: {  type: mongoose.Schema.Types.ObjectId, 
              required: true, 
              ref:'Faro'},

  comentarios: [{
    fecha: Date,
    nombre: String,
    email: String,
    cuerpo: String
  }]
  },{ versionKey: false });


export const comentarioModel = mongoose.model('Comentario', comentarioSchema);
