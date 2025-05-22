const express = require('express'); 
const resenasController = require('./controllers/resenasController'); 
const morgan = require('morgan');  
const app = express(); 
app.use(morgan('dev')); 
app.use(express.json()); 
app.use(resenasController); 
app.listen(3001, () => { 
  console.log('backResenas ejecutandose en el puerto 3001'); 
}); 