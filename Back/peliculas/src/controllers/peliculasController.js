const { Router } = require('express');
const router = Router();
const peliculasModel = require('../models/peliculasModel');

router.get('/peliculas', async (req, res) => {
 var result;
 result = await peliculasModel.traerPeliculas() ;
 //console.log(result);
 res.json(result);
});

router.get('/peliculas/:id', async (req, res) => {
const id = req.params.id;
 var result;
 result = await peliculasModel.traerPelicula(id);
 //console.log(result);
 res.json(result);
});

router.get('/peliculas/:nombre', async (req, res) => {
  const nombre = req.params.nombre;
  const result = await peliculasModel.buscarPelicula(nombre);
  res.json(result);
});

router.get('/peliculas/genero/:genero', async (req, res) => {
  const genero = req.params.genero;
  const result = await peliculasModel.filtrarPelicula(genero);
  if (!result || result.length === 0) {
    return res.status(404).json({ message: "No se encontraron peliculas de este genero :(" });
  }
  res.json(result);
});

router.post('/peliculas', async (req, res) => {
 const nombre = req.body.nombre;
 const fechaEstreno = req.body.fechaEstreno;
 const genero = req.body.genero;
 const credito = req.body.credito;

 var result = await peliculasModel.crearPelicula(nombre, fechaEstreno, genero, credito) ;
 res.send("Pelicula subida");
});

router.delete('/peliculas/:id', async (req, res) => {
 const id = req.params.id;
 var result;
 result = await peliculasModel.borrarPelicula(id) ;
 //console.log(result);
 res.send("Pelicula borrada");
});

router.put('/peliculas/:id', async (req, res) => {
 const id = req.params.id;
 const nombre = req.body.nombre;
 const fechaEstreno = req.body.fechaEstreno;
 const genero = req.body.genero;
 const credito = req.body.credito;

 var result = await peliculasModel.actualizarPelicula(id, nombre, fechaEstreno, genero, credito) ;
 res.send("Pelicula actualizada");
});

router.put('/calificacion/:id', async (req, res) => {
 const id = req.params.id;
 const calificacion = req.body.calificacion;
 var result = await peliculasModel.actualizarCalificacion(id, calificacion) ;
 res.send("Calificacion actualizada");
});

router.get('/peliculas-ordenadas', async (req, res) => {
  try {
    const result = await peliculasModel.ordenarPeliculas();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;