const controlador = require('./controlador');

async function mostrarLista(req, res) {
  try {
    const alumnos = await controlador.listarAlumnos();
    res.json(alumnos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function mostrarDetalle(req, res) {
  try {
    const { id } = req.params;
    const alumno = await controlador.verAlumno(id);
    if (!alumno) {
      res.status(404).json({ mensaje: 'Alumno no encontrado' });
      return;
    }
    res.json(alumno);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { mostrarLista, mostrarDetalle };
