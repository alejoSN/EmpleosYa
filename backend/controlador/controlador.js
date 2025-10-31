const modelo = require("../modelo/rutas");

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

async function borrarAlumno(req, res) {
  try {
    const { id } = req.params;
    const filas = await modelo.borrarAlumno(id);

    if (filas > 0) {
      res.json({ mensaje: "Alumno eliminado correctamente" });
    } else {
      res.status(404).json({ error: "Alumno no encontrado" });
    }
  } catch (error) {
    console.error("Error al borrar alumno:", error);
    res.status(500).json({ error: "Error al borrar alumno" });
  }
}

async function actualizarAlumno(req, res) {
  try {
    const { id } = req.params;

    const nuevosDatos = {
      ...req.body,
      foto: req.files?.foto?.[0] ? `/imagenes/${req.files.foto[0].filename}` : undefined,
      cv: req.files?.cv?.[0] ? `/CVs/${req.files.cv[0].filename}` : undefined,
    };

    Object.keys(nuevosDatos).forEach((key) => {
      if (nuevosDatos[key] === undefined) delete nuevosDatos[key];
    });

    const filas = await modelo.actualizarAlumno(id, nuevosDatos);

    if (filas > 0) {
      res.json({ mensaje: "Alumno actualizado correctamente" });
    } else {
      res.status(404).json({ error: "Alumno no encontrado o sin cambios" });
    }
  } catch (error) {
    console.error("Error al actualizar alumno:", error);
    res.status(500).json({ error: "Error al actualizar alumno" });
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
    const { nombre, apellido, descripcion, especialidad, ocupado, empresa_cuit } = req.body;

    if (!nombre || !especialidad) {
      return res.status(400).json({ error: "Faltan datos requeridos" });
    }
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
  console.log("Datos recibidos:", req.body);
  try {
    const { cuit, razon_social, contrasena } = req.body;

    if (!cuit || !razon_social || !contrasena) {
      return res.status(400).json({ error: "Faltan datos requeridos" });
    }

    const nuevoId = await modelo.insertarEmpresa({
      cuit,
      razon_social,
      contrasena
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
      res.json({ mensaje: "Empresa eliminada correctamente" });
    } else {
      res.status(404).json({ error: "Empresa no encontrada" });
    }
  } catch (error) {
    console.error("Error al borrar empresa:", error);

    if (error.code === "ER_ROW_IS_REFERENCED_2") {
      res.status(400).json({
        error: "No se puede borrar la empresa porque tiene alumnos asignados"
      });
    } else {
      res.status(500).json({ error: "Error al borrar empresa" });
    }
  }
}

async function actualizarEmpresa(req, res) {
  try {
    const { cuit } = req.params;
    const nuevosDatos = req.body;

    const filas = await modelo.actualizarEmpresa(cuit, nuevosDatos);
    if (filas > 0) {
      res.json({ mensaje: "Empresa actualizada correctamente" });
    } else {
      res.status(404).json({ error: "Empresa no encontrada o sin cambios" });
    }
  } catch (error) {
    console.error("Error al actualizar empresa:", error);
    res.status(500).json({ error: "Error al actualizar empresa" });
  }
}

async function login(req, res) {
  try {
    const { usuario, contrasena } = req.body;

    if (!usuario || !contrasena) {
      return res.status(400).json({ error: "Faltan datos requeridos" });
    }

    const admin = await modelo.administradorPorUsuario(usuario);
    if (admin && admin.contrasena === contrasena) {
      return res.json({ tipo: "admin", mensaje: "Inicio de sesión exitoso" });
    }

    const empresa = await modelo.empresaPorUsuario(usuario);
    if (empresa && empresa.contrasena === contrasena) {
      return res.json({ tipo: "empresa", mensaje: "Inicio de sesión exitoso" });
    }

    return res.status(404).json({ error: "Usuario o contraseña incorrectos" });

  } catch (error) {
    console.error("Error al intentar iniciar sesión:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

module.exports = {mostrarAlumnos, detalleAlumno, borrarAlumno, actualizarAlumno, mostrarEmpresas, mostrarAlumnosEspecialidad, crearAlumno, crearEmpresa, borrarEmpresa, actualizarEmpresa, login};
