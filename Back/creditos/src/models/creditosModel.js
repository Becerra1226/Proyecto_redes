const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cine'
});

async function agregarCreditos(usuario_id, cantidad) {
  // Sumar créditos en tabla creditos
  await connection.query(
    'UPDATE creditos SET creditos = creditos + ? WHERE usuario_id = ?',
    [cantidad, usuario_id]
  );

  // Actualizar también en la tabla usuarios el creditoDisponible
  await connection.query(
    'UPDATE usuarios u INNER JOIN creditos c ON u.id = c.usuario_id SET u.creditoDisponible = c.creditos WHERE u.id = ?',
    [usuario_id]
  );
}

async function descontarCreditos(usuario_id, cantidad) {
  const [result] = await connection.query(
    'SELECT creditos FROM creditos WHERE usuario_id = ?',
    [usuario_id]
  );

  if (result.length === 0) {
    console.log("No se encontró el usuario con id:", usuario_id);
    throw new Error("Usuario no encontrado");
  }

  const actuales = result[0].creditos;

  if (actuales < cantidad) {
    return false;
  }

  // Restar créditos en tabla creditos
  await connection.query(
    'UPDATE creditos SET creditos = creditos - ? WHERE usuario_id = ?',
    [cantidad, usuario_id]
  );

  // Actualizar también en la tabla usuarios el creditoDisponible
  await connection.query(
    'UPDATE usuarios u INNER JOIN creditos c ON u.id = c.usuario_id SET u.creditoDisponible = c.creditos WHERE u.id = ?',
    [usuario_id]
  );

  return true;
}

// ... otras funciones

module.exports = {
  agregarCreditos,
  descontarCreditos,
  // otras exportaciones
};
