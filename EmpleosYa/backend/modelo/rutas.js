const pool = require('./conexion');

async function alumnos() {
  const [rows] = await pool.query('SELECT ID, nombre, apellido, foto, descripcion FROM alumnos');
  return rows;
}

async function alumnoID(id) {
  const [rows] = await pool.query('SELECT * FROM alumnos WHERE ID = ?', [id]);
  return rows[0];
}

async function alumnosEspecialidad(especialidad) {
  const [rows] = await pool.query('SELECT ID, nombre, apellido, foto, descripcion FROM alumnos WHERE especialidad = ?',[especialidad]);
  return rows;
}

async function insertarAlumno({ nombre, apellido, descripcion, foto, cv, contrasena, especialidad, ocupado, empresa}) {
  const [result] = await pool.query('INSERT INTO alumnos (nombre, apellido, descripcion, foto, cv, contrasena, especialidad, ocupado, Empresa) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [nombre, apellido, descripcion, foto, cv, contrasena, especialidad, ocupado, empresa || null]);
  return result.insertId; 
}

async function empresas() {
  const [rows] = await pool.query('SELECT * FROM empresas ORDER BY LOWER(razon_social) ASC');
  return rows;
}

async function insertarEmpresa({ cuit, razon_social, contrasena }) {
  const [result] = await pool.query(`INSERT INTO empresas (cuit, razon_social, contrasena) VALUES (?, ?, ?)`, [cuit, razon_social, contrasena]);
  return result.insertId;
}

async function empresaPorCuit(cuit) {
  const [rows] = await pool.query('SELECT * FROM empresas WHERE cuit = ?', [cuit]);
  return rows[0] || null;
}

async function borrarEmpresa(cuit) {
  const [result] = await pool.query('DELETE FROM empresas WHERE cuit = ?', [cuit]);
  return result.affectedRows;
}

async function actualizarEmpresa(cuit, nuevosDatos) {
  const updates = [];
  const params = [];

  for (const key in nuevosDatos) {
    updates.push(`${key} = ?`);
    params.push(nuevosDatos[key]);
  }

  params.push(cuit);
  const [result] = await pool.query(`UPDATE empresas SET ${updates.join(', ')} WHERE cuit = ?`, params);
  return result.affectedRows;
}

module.exports = { alumnos, alumnoID, empresas, alumnosEspecialidad, insertarAlumno, insertarEmpresa,empresaPorCuit, borrarEmpresa, actualizarEmpresa };