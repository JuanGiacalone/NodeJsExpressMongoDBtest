import express from 'express'
import { farosModel } from '../models/Faro.js';
const farosRouter = express.Router();


farosRouter.get('/', (req, res) => {
  res.send('lo faro') 
});

farosRouter.post('/add', ( req, res) => { 
    if(req)
    res.send(req.body)
    console.log(req.body);
})

export {farosRouter};


