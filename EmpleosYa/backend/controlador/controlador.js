const modelo = require('./rutas');

async function listarAlumnos() {
  const alumnos = await modelo.alumnos();
  return alumnos;
}

async function verAlumno(id) {
  const alumno = await modelo.alumnoID(id);
  return alumno;
}

module.exports = { listarAlumnos, verAlumno };
