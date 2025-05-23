const express = require('express');
const cors = require('cors');
const peliculasController = require('./controllers/peliculasController');

const app = express();

app.use(cors()); // <--- Habilita CORS para todas las rutas
app.use(express.json());
app.use(peliculasController);

app.listen(3002, () => {
  console.log('Servidor corriendo en puerto 3002');
});
