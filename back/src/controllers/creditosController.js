const { Router } = require('express');
const router = Router();
const modelo = require('../models/creditosModel');

router.patch('/creditos/agregar/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const cantidad = req.body.cantidad;

    await modelo.agregarCreditos(id, cantidad);
    res.send('Créditos agregados');
  } catch (err) {
    console.error("ERROR AL AGREGAR:", err);
    res.status(500).send(err.message || 'Error en el servidor');
  }
});

router.patch('/creditos/descontar/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const cantidad = req.body.cantidad;

    const resultado = await modelo.descontarCreditos(id, cantidad);

    if (resultado) {
      res.send('Créditos descontados');
    } else {
      res.status(400).send('Créditos insuficientes');
    }
  } catch (err) {
    console.error("ERROR AL DESCONTAR:", err);
    res.status(500).send(err.message || 'Error en el servidor');
  }
});

module.exports = router;
