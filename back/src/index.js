const express = require('express');
const morgan = require('morgan');
const cors = require('cors'); // Importar cors
const creditosController = require('./controllers/creditosController');

const app = express();
app.use(morgan('dev'));
app.use(express.json());

// Usar cors para permitir peticiones desde cualquier origen
app.use(cors());

app.get('/', (req, res) => {
  res.send('Microservicio de créditos funcionando correctamente 🚀');
});

app.use(creditosController);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Microservicio de créditos en el puerto ${PORT}`);
});
