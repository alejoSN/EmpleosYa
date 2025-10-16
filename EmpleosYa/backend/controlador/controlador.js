const modelo = require('../modelo/rutas');
const bcrypt = require("bcryptjs");


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

async function crearAlumno(req, res) {
  try {
    console.log("req.body:", req.body);
    console.log("req.files:", req.files);

    const { nombre, apellido, descripcion, contrasena, especialidad, ocupado, empresa_cuit } = req.body;

    if (!nombre || !contrasena || !especialidad) {
      return res.status(400).json({ error: "Faltan datos requeridos" });
    }
    const hashed = await bcrypt.hash(contrasena, 10);

    const fotoFile = req.files?.foto?.[0];
    const cvFile = req.files?.cv?.[0];
    const fotoPath = fotoFile ? `/imagenes/${fotoFile.filename}` : null;
    const cvPath = cvFile ? `/CVs/${cvFile.filename}` : null;

    const nuevoId = await modelo.insertarAlumno({
      nombre,
      apellido,
      descripcion,
      foto: fotoPath,
      cv: cvPath,
      contrasena: hashed,
      especialidad: Number(especialidad),
      ocupado: ocupado === "1" || ocupado === 1 || ocupado === true ? 1 : 0,
      empresa: empresa_cuit || null
    });

    res.status(201).json({ mensaje: "Alumno creado", id: nuevoId });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al crear alumno" });
  }
}

async function crearEmpresa(req, res) {
  try {
    console.log("req.body:", req.body);
    console.log("req.files:", req.files);

    const { cuit, razon, contrasena } = req.body;
    if (!cuit || !razon || !contrasena) {
      return res.status(400).json({ error: "Faltan datos requeridos" });
    }

    const hashed = await bcrypt.hash(contrasena, 10);

    const nuevoId = await modelo.insertarEmpresa({
      cuit,
      razon_social: razon,
      contrasena: hashed
    });

    res.status(201).json({ mensaje: "Empresa creada", id: nuevoId });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al crear empresa" });
  }
}

async function borrarEmpresa(req, res) {
  try {
    const { cuit } = req.params;

    const filas = await modelo.borrarEmpresa(cuit);
    if (filas > 0) {
      res.json({ mensaje: 'Empresa eliminada correctamente' });
    } else {
      res.status(404).json({ error: 'Empresa no encontrada' });
    }
  } catch (error) {
    console.error('Error al borrar empresa:', error);

    if (error.code === 'ER_ROW_IS_REFERENCED_2') {
      res.status(400).json({
        error: 'No se puede borrar la empresa porque tiene alumnos asignados'
      });
    } else {
      res.status(500).json({ error: 'Error al borrar empresa' });
    }
  }
}

async function actualizarEmpresa(req, res) {
  try {
    const { cuit } = req.params;
    const nuevosDatos = req.body;

    if (nuevosDatos.contrasena) {
      nuevosDatos.contrasena = await bcrypt.hash(nuevosDatos.contrasena, 10);
    }

    const filas = await modelo.actualizarEmpresa(cuit, nuevosDatos);
    if (filas > 0) {
      res.json({ mensaje: 'Empresa actualizada correctamente' });
    } else {
      res.status(404).json({ error: 'Empresa no encontrada o sin cambios' });
    }
  } catch (error) {
    console.error('Error al actualizar empresa:', error);
    res.status(500).json({ error: 'Error al actualizar empresa' });
  }
}

module.exports = { mostrarAlumnos, detalleAlumno, mostrarEmpresas, mostrarAlumnosEspecialidad, crearAlumno, crearEmpresa, borrarEmpresa, actualizarEmpresa };
