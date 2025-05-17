const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // Pon tu contraseña si tienes una
  database: 'cine'
});

async function agregarCreditos(id, cantidad) {
  await connection.query(
    'UPDATE creditos SET creditos = creditos + ? WHERE id = ?',
    [cantidad, id]
  );
}

async function descontarCreditos(id, cantidad) {
  const [result] = await connection.query(
    'SELECT creditos FROM creditos WHERE id = ?',
    [id]
  );

  if (result.length === 0) {
    console.log("No se encontró el usuario con id:", id);
    throw new Error("Usuario no encontrado");
  }

  const actuales = result[0].creditos;

  if (actuales < cantidad) {
    return false;
  }

  await connection.query(
    'UPDATE creditos SET creditos = creditos - ? WHERE id = ?',
    [cantidad, id]
  );

  return true;
}

module.exports = {
  agregarCreditos,
  descontarCreditos
};
