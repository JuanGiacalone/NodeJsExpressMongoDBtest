import mongoose from 'mongoose'

export const comentarioSchema = mongoose.Schema({
    fecha:Date, 
    nombre: String,
    email: String, 
    cuerpo: String
  });


// export const comentarioModel = mongoose.model('Comentario', comentarioSchema);
