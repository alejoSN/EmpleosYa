const pool = require('./conexion');

async function alumnos() {
  const [rows] = await pool.query('SELECT ID, nombre, apellido, foto, descripcion FROM alumnos');
  return rows;
}

async function alumnoID(id) {
  const [rows] = await pool.query('SELECT * FROM alumnos WHERE ID = ?', [id]);
  return rows[0];
}

async function empresas() {
  const [rows] = await pool.query('SELECT * FROM empresas ORDER BY LOWER(razon_social) ASC');
  return rows;
}

async function alumnosEspecialidad(especialidad) {
  const [rows] = await pool.query('SELECT ID, nombre, apellido, foto, descripcion FROM alumnos WHERE especialidad = ?',[especialidad]);
  return rows;
}


module.exports = { alumnos, alumnoID, empresas, alumnosEspecialidad };