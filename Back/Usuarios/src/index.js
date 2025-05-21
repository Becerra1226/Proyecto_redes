const express = require('express');
const usuariosController = require('./controllers/usuariosController.js');
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(usuariosController);
6
app.listen(3005, () => {
 console.log('backUsuarios ejecutandose en el puerto 3005');
});
