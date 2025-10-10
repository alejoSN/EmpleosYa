const pool = require('./conexion');

async function alumnos() {
  const [rows] = await pool.query('SELECT nombre, apellido, foto, descripcion FROM alumnos');
  return rows;
}

async function alumnoID(id) {
  const [rows] = await pool.query('SELECT * FROM alumnos WHERE id = ?', [id]);
  return rows
}

module.exports = { alumnos, alumnoID};
