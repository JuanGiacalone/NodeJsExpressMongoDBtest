import mongoose from 'mongoose'

const commentSchema = mongoose.Schema({
    name: String,
    body: String
  });


export const commentModel = mongoose.model('comments', commentSchema);
