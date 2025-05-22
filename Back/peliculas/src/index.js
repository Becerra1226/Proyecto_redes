const express = require('express');
const peliculasController = require('./controllers/peliculasController');
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(peliculasController);
app.listen(3002, () => {
 console.log('backPeliculas ejecutandose en el puerto 3002');
});