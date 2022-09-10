import mongoose from 'mongoose'

const puntoSchema = mongoose.Schema({
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  });

const faroSchema = mongoose.Schema({
    idFaro: {type: Number, require:true},
    nombre: String,
    coordenadas: { type: puntoSchema, required: true},
    descripcion: String,
    caracteristicas: String,
    historia: String,
    ubicacion: String,
    impresiones: Number,
    comentarios: [{fecha:Date, nombre: String, email: String, cuerpo: String}],
    activo: Boolean,
    accesibile: Boolean,
    accesoPago: Boolean,
    urlImagen: String
})

export const farosModel = mongoose.model('faros', faroSchema);
export const puntosModel = mongoose.model('puntos', puntoSchema);