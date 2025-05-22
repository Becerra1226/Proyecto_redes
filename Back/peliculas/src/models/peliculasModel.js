const mysql = require('mysql2/promise');
const connection = mysql.createPool({
 host: 'localhost',
 user: 'root',
 password: '',
 database: 'peliculas'
});

// GET peliculas todas
async function traerPeliculas() {
 const result = await connection.query('SELECT * FROM peliculas',);
 return result[0];
}

// GET peliculas por nombre
async function buscarPelicula(nombre) {
  try {
    if (!nombre || typeof nombre !== 'string') {
      throw new Error('Nombre inválido');
    }

    const [rows] = await connection.query(
      'SELECT * FROM peliculas WHERE LOWER(nombre) LIKE ?',
      [`%${nombre.toLowerCase()}%`]
    );
    return rows;
  } catch (error) {
    console.error('Error al buscar película:', error.message);
    throw error;
  }
}

// GET pelicula por id
async function traerPelicula(id) {
 const result = await connection.query('SELECT * FROM peliculas WHERE id =?', [id]);
 return result[0];
}

// GET Filtrar pelicula por id
async function filtrarPelicula(genero) {
const [rows] = await connection.query("SELECT * FROM peliculas WHERE genero = ?", [genero]);
return rows;
}

// POST peliculas
async function crearPelicula(nombre, fechaEstreno, genero, credito) {
  const result = await connection.query('INSERT INTO peliculas (nombre, fechaEstreno, genero, credito) VALUES (?, ?, ?, ?)',
    [nombre, fechaEstreno, genero, credito]
  );
  return result;
}

// Actualizar pelicula por id
async function actualizarPelicula(id, nombre, fechaEstreno, genero, credito) {
  const result = await connection.query('UPDATE peliculas SET nombre = ?, fechaEstreno = ?, genero = ?, credito = ? WHERE id = ?',
    [nombre, fechaEstreno, genero, credito, id]
  );
  return result;
}

//Actualizar calificacion por id
async function actualizarCalificacion(id, calificacion) {
  const result = await connection.query('UPDATE peliculas SET calificacion = ? WHERE id = ?',
    [calificacion,  id]
  );
  return result;
}

// DELETE pelicula por id
async function borrarPelicula(id) {
 const result = await connection.query('DELETE FROM peliculas WHERE id =?', id);
 return result;
}

// Ordenar peliculas por calificacion
async function ordenarPeliculas() {
 const result = await connection.query('SELECT * FROM peliculas ORDER BY calificacion DESC');
 return result[0];
}

// Exportar funciones
module.exports = {
 traerPeliculas, traerPelicula, buscarPelicula, crearPelicula, borrarPelicula, filtrarPelicula, actualizarPelicula, actualizarCalificacion, ordenarPeliculas
};
