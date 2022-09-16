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

  // export const puntoModel = mongoose.model('Punto',puntoSchema);