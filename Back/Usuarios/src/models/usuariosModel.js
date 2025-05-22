const mysql = require('mysql2/promise');

const conexion = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // tu contraseña
  database: 'usuarios' // nombre de tu base de datos
});

// Obtener todos los usuarios
const traerUsuarios = async () => {
  const [rows] = await conexion.query("SELECT * FROM usuarios");
  return rows;
};

// Obtener un usuario por ID
const traerUsuario = async (id) => {
  const [rows] = await conexion.query("SELECT * FROM usuarios WHERE id = ?", [id]);
  return rows;
};

// Obtener un usuario por correo
const traerPorCorreo = async (correo) => {
  const [rows] = await conexion.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
  return rows;
};

// Crear un nuevo usuario
const crearUsuario = async (correo, contrasenia, tipo, creditoDisponible) => {
  const result = await conexion.query(
    "INSERT INTO usuarios (correo, contrasenia, tipo, creditoDisponible) VALUES (?, ?, ?, ?)",
    [correo, contrasenia, tipo, creditoDisponible]
  );
  return result;
};

// Actualizar crédito disponible
const actualizarUsuario = async (id, creditoDisponible) => {
  const result = await conexion.query(
    "UPDATE usuarios SET creditoDisponible = ? WHERE id = ?",
    [creditoDisponible, id]
  );
  return result;
};

// Validar usuario por correo y contraseña
const validarUsuario = async (correo, contrasenia) => {
  const [rows] = await conexion.query(
    "SELECT * FROM usuarios WHERE correo = ? AND contrasenia = ?",
    [correo, contrasenia]
  );
  return rows;
};

// Borrar usuario
const borrarUsuario = async (id) => {
  const result = await conexion.query("DELETE FROM usuarios WHERE id = ?", [id]);
  return result;
};

module.exports = {
  traerUsuarios,
  traerUsuario,
  traerPorCorreo,
  crearUsuario,
  actualizarUsuario,
  validarUsuario,
  borrarUsuario
};
