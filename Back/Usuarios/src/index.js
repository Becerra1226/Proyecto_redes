const express = require('express');
const cors = require('cors');
const usuariosController = require('./controllers/usuariosController.js');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(cors({
  origin: 'http://localhost',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true,
}));
app.use(express.json());
app.use(usuariosController);
app.use(cors());


app.listen(3005, () => {
  console.log('backUsuarios ejecutandose en el puerto 3005');
});
