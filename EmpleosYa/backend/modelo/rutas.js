const pool = require('./conexion');

async function alumnos() {
  const [rows] = await pool.query('SELECT nombre, apellido, foto, descripcion FROM alumnos');
  return rows;
}

module.exports = { alumnos};
