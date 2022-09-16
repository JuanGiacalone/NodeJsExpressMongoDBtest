import mongoose from 'mongoose'
import {  puntoSchema } from './Punto.js';
import {  comentarioSchema } from './Comentario.js';

const faroSchema = mongoose.Schema({
    idFaro: {type: Number, require:true},
    nombre: String,
    coordenadas: { type: puntoSchema, required: true},
    descripcion: String,
    caracteristicas: String,
    historia: String,
    ubicacion: String,
    impresiones: Number,
    comentarios: [comentarioSchema],
    activo: Boolean,
    accesibile: Boolean,
    accesoPago: Boolean,
    urlImagen: String,
},{ versionKey: false })

export const faroModel = mongoose.model('Faro', faroSchema);
