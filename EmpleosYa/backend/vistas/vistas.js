const controlador = require('../controlador/controlador');

async function mostrarLista(req, res) {
  await controlador.listarAlumnos(req, res);
}

async function mostrarDetalle(req, res) {
  await controlador.detalleAlumno(req, res);
}

module.exports = { mostrarLista, mostrarDetalle };
