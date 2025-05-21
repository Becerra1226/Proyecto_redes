const mysql = require('mysql2/promise');

const conexion = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // tu contraseña
  database: 'usuarios' // nombre de tu base de datos
});

module.exports = conexion;

const traerUsuarios = async () => {
  const [rows] = await conexion.query("SELECT * FROM usuarios");
  return rows;
};

const traerUsuario = async (id) => {
  const [rows] = await conexion.query("SELECT * FROM usuarios WHERE id = ?", [id]);
  return rows;
};

async function traerPorCorreo(correo) {
  const [rows] = await db.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
  return rows;
}

const crearUsuario = async (correo, contrasenia, tipo, creditoDisponible) => {
  const result = await conexion.query(
    "INSERT INTO usuarios (correo, contrasenia, tipo, creditoDisponible) VALUES (?, ?, ?, ?)",
    [correo, contrasenia, tipo, creditoDisponible]
  );
  return result;
};

const actualizarUsuario = async (id, creditoDisponible) => {
  const result = await conexion.query(
    "UPDATE usuarios SET creditoDisponible = ? WHERE id = ?",
    [creditoDisponible, id]
  );
  return result;
};

const validarUsuario = async (id, contrasenia) => {
  const [rows] = await conexion.query(
    "SELECT * FROM usuarios WHERE correo = ? AND contrasenia = ?",
    [id, contrasenia]
  );
  return rows;
};

const borrarUsuario = async (id) => {
  const result = await conexion.query("DELETE FROM usuarios WHERE id = ?", [id]);
  return result;
};

module.exports = {
  traerUsuarios,
  traerUsuario,
  crearUsuario,
  actualizarUsuario,
  borrarUsuario,
  validarUsuario,
  traerPorCorreo
};