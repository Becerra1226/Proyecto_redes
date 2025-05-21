const { Router } = require('express');
const router = Router();
const usuariosModel = require('../models/usuariosModel');

// Obtener todos los usuarios
router.get('/usuarios', async (req, res) => {
  const result = await usuariosModel.traerUsuarios();
  res.json(result);
});

// Obtener un usuario por ID
router.get('/usuarios/:id', async (req, res) => {
  const id = req.params.id;
  const result = await usuariosModel.traerUsuario(id);
  res.json(result[0]); // suponiendo que devuelve un array
});

//validar correo

router.get('/usuarios/correo/:correo', async (req, res) => {
  const correo = decodeURIComponent(req.params.correo); // importante para el @
  const result = await usuariosModel.traerPorCorreo(correo);

  if (result.length > 0) {
    res.json(result[0]);
  } else {
    res.status(404).send('Usuario no encontrado');
  }
});

//Validar usuario
router.get('/usuarios/validar/:id/:contrasenia', async (req, res) => {
  
    const { id, contrasenia } = req.params;
  
    const resultado = await usuariosModel.validarUsuario(id, contrasenia);
  
    if (resultado.length > 0) {
      res.json({ mensaje: "Usuario válido", usuario: resultado[0] });
    } else {
      res.status(401).json({ mensaje: "Credenciales inválidas" });
    }
  });

// Crear un nuevo usuario
router.post('/usuarios', async (req, res) => {
  const correo = req.body.correo;
  const contrasenia = req.body.contrasenia;
  const tipo = req.body.tipo;
  const creditoDisponible = req.body.creditoDisponible;

  if (!['usuario', 'administrador'].includes(tipo)) {
    res.status(400).send("Tipo de usuario inválido");
    return;
  }

  const result = await usuariosModel.crearUsuario(correo, contrasenia, tipo, creditoDisponible);
  res.send("usuario creado");
});

// Actualizar crédito disponible de un usuario
router.put('/usuarios/:id', async (req, res) => {
  const id = req.params.id;
  const creditoDisponible = req.body.creditoDisponible;

  if (creditoDisponible < 0) {
    res.status(400).send("El crédito no puede ser negativo");
    return;
  }

  const result = await usuariosModel.actualizarUsuario(id, creditoDisponible);
  res.send("crédito actualizado");
});



// Eliminar un usuario
router.delete('/usuarios/:id', async (req, res) => {
  const id = req.params.id;
  const result = await usuariosModel.borrarUsuario(id);
  res.send("usuario eliminado");
});

module.exports = router;