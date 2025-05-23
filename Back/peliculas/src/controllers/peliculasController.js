const { Router } = require('express');
const router = Router();
const peliculasModel = require('../models/peliculasModel');

router.get('/peliculas', async (req, res) => {
  try {
    const result = await peliculasModel.traerPeliculas();
    res.json(result);
  } catch (error) {
    console.error('Error trayendo películas:', error);
    res.status(500).json({ message: 'Error trayendo películas' });
  }
});

router.get('/peliculas/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await peliculasModel.traerPelicula(id);
    if (result.length === 0) return res.status(404).json({ message: 'Película no encontrada' });
    res.json(result[0]);
  } catch (error) {
    console.error('Error trayendo película:', error);
    res.status(500).json({ message: 'Error trayendo película' });
  }
});

router.get('/peliculas/nombre/:nombre', async (req, res) => {
  try {
    const nombre = req.params.nombre;
    const result = await peliculasModel.buscarPelicula(nombre);
    if (!result || result.length === 0) {
      return res.status(404).json({ message: 'No se encontraron películas con ese nombre' });
    }
    res.json(result);
  } catch (error) {
    console.error('Error buscando película:', error);
    res.status(500).json({ message: 'Error buscando película' });
  }
});

router.get('/peliculas/genero/:genero', async (req, res) => {
  try {
    const genero = req.params.genero;
    const result = await peliculasModel.filtrarPelicula(genero);
    if (!result || result.length === 0) {
      return res.status(404).json({ message: 'No se encontraron películas de este género' });
    }
    res.json(result);
  } catch (error) {
    console.error('Error filtrando películas:', error);
    res.status(500).json({ message: 'Error filtrando películas' });
  }
});

router.post('/peliculas', async (req, res) => {
  try {
    const { nombre, fechaEstreno, genero, credito, sinopsis } = req.body;
    if (!nombre || !fechaEstreno || !genero || credito == null || sinopsis == null) {
      return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }
    await peliculasModel.crearPelicula(nombre, fechaEstreno, genero, credito, sinopsis);
    res.status(201).send('Película subida exitosamente');
  } catch (error) {
    console.error('Error creando película:', error);
    res.status(500).json({ message: 'Error al subir la película' });
  }
});

router.delete('/peliculas/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await peliculasModel.borrarPelicula(id);
    res.send('Película borrada exitosamente');
  } catch (error) {
    console.error('Error borrando película:', error);
    res.status(500).json({ message: 'Error borrando película' });
  }
});

router.put('/peliculas/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { nombre, fechaEstreno, genero, credito, sinopsis } = req.body;
    await peliculasModel.actualizarPelicula(id, nombre, fechaEstreno, genero, credito, sinopsis);
    res.send('Película actualizada exitosamente');
  } catch (error) {
    console.error('Error actualizando película:', error);
    res.status(500).json({ message: 'Error actualizando película' });
  }
});

router.put('/calificacion/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { calificacion } = req.body;
    await peliculasModel.actualizarCalificacion(id, calificacion);
    res.send('Calificación actualizada exitosamente');
  } catch (error) {
    console.error('Error actualizando calificación:', error);
    res.status(500).json({ message: 'Error actualizando calificación' });
  }
});

router.get('/peliculas-ordenadas', async (req, res) => {
  try {
    const result = await peliculasModel.ordenarPeliculas();
    res.json(result);
  } catch (error) {
    console.error('Error obteniendo películas ordenadas:', error);
    res.status(500).json({ message: 'Error obteniendo películas ordenadas' });
  }
});

module.exports = router;
