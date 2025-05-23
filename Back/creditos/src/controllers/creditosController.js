const { Router } = require('express');
const router = Router();
const modelo = require('../models/creditosModel');

router.patch('/creditos/agregar/:id', async (req, res) => {
  try {
    const usuario_id = req.params.id;
    const cantidad = req.body.cantidad;

    await modelo.agregarCreditos(usuario_id, cantidad);
    res.send('Créditos agregados');
  } catch (err) {
    console.error("ERROR AL AGREGAR:", err);
    res.status(500).send(err.message || 'Error en el servidor');
  }
});

router.patch('/creditos/descontar/:id', async (req, res) => {
  try {
    const usuario_id = req.params.id;
    const cantidad = req.body.cantidad;

    const resultado = await modelo.descontarCreditos(usuario_id, cantidad);

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

// Ruta para obtener usuario con créditos (usado para mostrar en frontend)
router.get('/usuarios/:id', async (req, res) => {
  try {
    const usuario_id = req.params.id;
    const usuario = await modelo.obtenerUsuarioConCreditos(usuario_id);

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(usuario);
  } catch (error) {
    console.error("ERROR AL OBTENER USUARIO CON CRÉDITOS:", error);
    res.status(500).json({ error: "Error al obtener usuario" });
  }
});

module.exports = router;
