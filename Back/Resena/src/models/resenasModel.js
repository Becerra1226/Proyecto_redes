const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'resenas'
});

// Obtener todas las reseñas
async function traerResenas() {
    const [result] = await connection.query('SELECT * FROM resenas');
    return result;
}

// Obtener reseñas por ID de película
async function traerResenasPorPelicula(id_pelicula) {
    const [result] = await connection.query('SELECT * FROM resenas WHERE id_pelicula = ?', [id_pelicula]);
    return result;
}

// Obtener una reseña específica
async function traerResena(id) {
    const [result] = await connection.query('SELECT * FROM resenas WHERE id = ?', [id]);
    return result;
}

// Crear nueva reseña
async function crearResena(id_usuario, id_pelicula, descripcion, calificacion) {
    const result = await connection.query(
        'INSERT INTO resenas (id_usuario, id_pelicula, descripcion, calificacion) VALUES (?, ?, ?, ?)',
        [id_usuario, id_pelicula, descripcion, calificacion]
    );
    return result;
}

// Calcular promedio por película
async function obtenerPromedioCalificacion(id_pelicula) {
    const [result] = await connection.query(
        'SELECT AVG(calificacion) AS promedio FROM resenas WHERE id_pelicula = ?',
        [id_pelicula]
    );
    return result[0].promedio;
}

// Eliminar reseña
async function borrarResena(id) {
    const result = await connection.query('DELETE FROM resenas WHERE id = ?', [id]);
    return result;
}

module.exports = {
    traerResenas,
    traerResenasPorPelicula,
    traerResena,
    crearResena,
    obtenerPromedioCalificacion,
    borrarResena
};