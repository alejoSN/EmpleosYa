const pool = require("./conexion");

async function alumnos() {
  const [rows] = await pool.query("SELECT ID, nombre, apellido, foto, descripcion FROM alumnos");
  return rows;
}

async function alumnoID(id) {
  const [rows] = await pool.query(`
    SELECT alumnos.ID, alumnos.nombre, alumnos.apellido, alumnos.foto, alumnos.cv, alumnos.descripcion, alumnos.ocupado, alumnos.especialidad, empresas.razon_social AS empresa
    FROM alumnos
    LEFT JOIN empresas ON alumnos.empresa = empresas.cuit
    WHERE alumnos.ID = ?
  `, [id]);

  return rows[0];
}


async function alumnosEspecialidad(especialidad) {
  const [rows] = await pool.query("SELECT ID, nombre, apellido, foto, descripcion FROM alumnos WHERE especialidad = ?",[especialidad]);
  return rows;
}

async function insertarAlumno({ nombre, apellido, descripcion, foto, cv, especialidad, ocupado, empresa}) {
  const [result] = await pool.query("INSERT INTO alumnos (nombre, apellido, descripcion, foto, cv, especialidad, ocupado, Empresa) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [nombre, apellido, descripcion, foto, cv, especialidad, ocupado, empresa || null]);
  return result.insertId; 
}

async function borrarAlumno(id) {
  const [result] = await pool.query("DELETE FROM alumnos WHERE ID = ?", [id]);
  return result.affectedRows;
}

async function actualizarAlumno(id, nuevosDatos) {
  const updates = [];
  const params = [];

  for (const key in nuevosDatos) {
    updates.push(`${key} = ?`);
    params.push(nuevosDatos[key]);
  }

  params.push(id);
  const [result] = await pool.query(`UPDATE alumnos SET ${updates.join(", ")} WHERE ID = ?`, params);
  return result.affectedRows;
}

async function empresas() {
  const [rows] = await pool.query("SELECT * FROM empresas ORDER BY LOWER(razon_social) ASC");
  return rows;
}

async function insertarEmpresa({ cuit, razon_social, contrasena }) {
  const [result] = await pool.query(`INSERT INTO empresas (cuit, razon_social, contrasena) VALUES (?, ?, ?)`, [cuit, razon_social, contrasena]);
  return result.insertId;
}

async function empresaPorCuit(cuit) {
  const [rows] = await pool.query("SELECT * FROM empresas WHERE cuit = ?", [cuit]);
  return rows[0] || null;
}

async function borrarEmpresa(cuit) {
  const [result] = await pool.query("DELETE FROM empresas WHERE cuit = ?", [cuit]);
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
  const [result] = await pool.query(`UPDATE empresas SET ${updates.join(", ")} WHERE cuit = ?`, params);
  return result.affectedRows;
}

async function administradorPorUsuario(usuario) {
  const [rows] = await pool.query("SELECT * FROM administradores WHERE usuario = ?", [usuario]);
  return rows[0] || null;
}

async function empresaPorUsuario(usuario) {
  const [rows] = await pool.query("SELECT * FROM empresas WHERE razon_social = ?", [usuario]);
  return rows[0] || null;
}

module.exports = { alumnos, alumnoID, empresas, alumnosEspecialidad, insertarAlumno, borrarAlumno, actualizarAlumno, insertarEmpresa, empresaPorCuit, borrarEmpresa, actualizarEmpresa, administradorPorUsuario, empresaPorUsuario };