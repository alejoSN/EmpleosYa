const pool = require('./bd');

async function alumnos() {
  const [rows] = await pool.query('SELECT ID_alu, Nombre, Foto, Aspiraciones FROM alumnos');
  return rows;
}

async function alumnoID(id) {
  const [rows] = await pool.query('SELECT * FROM alumnos WHERE ID_alu = ?', [id]);
  return rows[0];
}

module.exports = { obtenerAlumnosResumen, obtenerAlumnoPorId };
