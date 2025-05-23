const mysql = require('mysql2/promise');
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'peliculas'
});

// GET todas las peliculas
async function traerPeliculas() {
  const result = await connection.query('SELECT * FROM peliculas');
  return result[0];
}

// GET pelicula por id
async function traerPelicula(id) {
  const result = await connection.query('SELECT * FROM peliculas WHERE id = ?', [id]);
  return result[0];
}

// GET peliculas por nombre (búsqueda)
async function buscarPelicula(nombre) {
  if (!nombre || typeof nombre !== 'string') {
    throw new Error('Nombre inválido');
  }
  const [rows] = await connection.query(
    'SELECT * FROM peliculas WHERE LOWER(nombre) LIKE ?',
    [`%${nombre.toLowerCase()}%`]
  );
  return rows;
}

// GET peliculas por genero
async function filtrarPelicula(genero) {
  const [rows] = await connection.query('SELECT * FROM peliculas WHERE genero = ?', [genero]);
  return rows;
}

// POST crear pelicula (ahora incluye sinopsis)
async function crearPelicula(nombre, fechaEstreno, genero, credito, sinopsis) {
  const result = await connection.query(
    'INSERT INTO peliculas (nombre, fechaEstreno, genero, credito, sinopsis) VALUES (?, ?, ?, ?, ?)',
    [nombre, fechaEstreno, genero, credito, sinopsis]
  );
  return result;
}

// PUT actualizar pelicula por id (incluye sinopsis)
async function actualizarPelicula(id, nombre, fechaEstreno, genero, credito, sinopsis) {
  const result = await connection.query(
    'UPDATE peliculas SET nombre = ?, fechaEstreno = ?, genero = ?, credito = ?, sinopsis = ? WHERE id = ?',
    [nombre, fechaEstreno, genero, credito, sinopsis, id]
  );
  return result;
}

// PUT actualizar calificación por id
async function actualizarCalificacion(id, calificacion) {
  const result = await connection.query(
    'UPDATE peliculas SET calificacion = ? WHERE id = ?',
    [calificacion, id]
  );
  return result;
}

// DELETE pelicula por id
async function borrarPelicula(id) {
  const result = await connection.query('DELETE FROM peliculas WHERE id = ?', [id]);
  return result;
}

// GET peliculas ordenadas por calificación descendente
async function ordenarPeliculas() {
  const result = await connection.query('SELECT * FROM peliculas ORDER BY calificacion DESC');
  return result[0];
}

module.exports = {
  traerPeliculas,
  traerPelicula,
  buscarPelicula,
  filtrarPelicula,
  crearPelicula,
  actualizarPelicula,
  actualizarCalificacion,
  borrarPelicula,
  ordenarPeliculas
};
