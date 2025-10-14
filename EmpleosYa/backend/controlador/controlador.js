const modelo = require('../modelo/rutas');

async function mostrarAlumnos(req, res) {
  try {
    const alumnos = await modelo.alumnos();
    res.json(alumnos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener alumnos" });
  }
}

async function detalleAlumno(req, res) {
  try {
    const { id } = req.params;
    const alumno = await modelo.alumnoID(id);

    if (!alumno) {
      return res.status(404).json({ mensaje: "Alumno no encontrado" });
    }

    res.json(alumno);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener alumno" });
  }
}

async function mostrarEmpresas(req, res) {
  try {
    const empresas = await modelo.empresas();
    res.json(empresas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener empresas" });
  }
}

async function mostrarAlumnosEspecialidad(req, res) {
  try {
    const { id } = req.params;
    const alumnos = await modelo.alumnosEspecialidad(id);
    res.json(alumnos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener alumnos por especialidad" });
  }
}

module.exports = { mostrarAlumnos, detalleAlumno, mostrarEmpresas, mostrarAlumnosEspecialidad };
