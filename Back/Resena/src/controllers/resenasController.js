const express = require('express');
const axios = require('axios');
const resenasModel = require('../models/resenasModel');

const router = express.Router();

router.post('/resenas', async (req, res) => {
    const { id_usuario, id_pelicula, descripcion, calificacion } = req.body;

    // Validaciones de entrada
    if (calificacion < 1 || calificacion > 5) {
        return res.status(400).send("La calificación debe estar entre 1 y 5");
    }

    // Verificar existencia del usuario
    try {
        const usuarioResponse = await axios.get(`http://localhost:3005/usuarios/${id_usuario}`);
        if (!usuarioResponse.data) {
            return res.status(404).send("Usuario no encontrado");
        }
    } catch (error) {
        return res.status(500).send("Error al verificar el usuario");
    }

    // Verificar existencia de la película
    try {
        const peliculaResponse = await axios.get(`http://localhost:3002/peliculas/${id_pelicula}`);
        if (!peliculaResponse.data) {
            return res.status(404).send("Película no encontrada");
        }
    } catch (error) {
        return res.status(500).send("Error al verificar la película");
    }

    // Crear reseña
    try {
        await resenasModel.crearResena(id_usuario, id_pelicula, descripcion, calificacion);
    } catch (error) {
        return res.status(500).send("Error al crear reseña");
    }

    // Calcular nuevo promedio
    try {
        const nuevoPromedio = await resenasModel.obtenerPromedioCalificacion(id_pelicula);

        // Actualizar promedio en microservicio de películas
        await axios.put(`http://localhost:3002/peliculas/${id_pelicula}/promedio`, {
            promedio: nuevoPromedio
        });
    } catch (error) {
        return res.status(500).send("Error al actualizar promedio en microservicio de películas");
    }

    res.send("Reseña registrada y promedio actualizado");
});

module.exports = router;