import mongoose from 'mongoose'

/// type: mongoose.Schema.Types.ObjectId,

const publicidadSchema = mongoose.Schema({
    
  idFaro: {  type: Number, 
              required: true, 
              ref:'Faro'},

  nombre: String,
  descripcion: String,
  url:String,
  creada:Date, 
  },{ versionKey: false });


export const publicidadModel = mongoose.model('Publicidad', publicidadSchema);
