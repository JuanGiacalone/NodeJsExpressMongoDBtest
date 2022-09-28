import mongoose from 'mongoose'

export const puntoSchema = mongoose.Schema({
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }, 
  }, {_id: false});

const faroSchema = mongoose.Schema({
    idFaro: {type: Number, require:true},
    nombre: String,
    provincia: String,
    coordenadas: { type: puntoSchema, required: true},
    descripcion: String,
    caracteristicas: String,
    historia: String,
    ubicacion: String,
    impresiones: Number,
    activo: Boolean,
    accesible: Boolean,
    accesoPago: Boolean,
    urlImagen: String,
}, { versionKey: false})

export const faroModel = mongoose.model('Faro', faroSchema);
