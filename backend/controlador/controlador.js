import modelo from "../modelo/rutas.js";
import sql from "../modelo/conexion.js";
import { uploadToSupabase, deleteFromSupabase } from "../middleware/archivos.js";

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

    if (!alumno) return res.status(404).json({ mensaje: "Alumno no encontrado" });

    res.json(alumno);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener alumno" });
  }
}

async function borrarAlumno(req, res) {
  try {
    const { id } = req.params;
    const alumno = await modelo.alumnoID(id);
    const filas = await modelo.borrarAlumno(id);

    if (filas > 0) {
      if (alumno?.foto) {
        await deleteFromSupabase(alumno.foto);
      }
      if (alumno?.cv) {
        await deleteFromSupabase(alumno.cv);
      }
      
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
    const nuevosDatos = { ...req.body };

    if (req.files?.foto?.[0]) {
      const alumnoActual = await modelo.alumnoID(id);
      if (alumnoActual?.foto) {
        await deleteFromSupabase(alumnoActual.foto);
      }
      
      nuevosDatos.foto = await uploadToSupabase(req.files.foto[0], "imagenes");
    }
    
    if (req.files?.cv?.[0]) {
      const alumnoActual = await modelo.alumnoID(id);
      if (alumnoActual?.cv) {
        await deleteFromSupabase(alumnoActual.cv);
      }
      
      nuevosDatos.cv = await uploadToSupabase(req.files.cv[0], "CVs");
    }

    const columnasValidas = ['nombre', 'apellido', 'descripcion', 'foto', 'cv', 'especialidad', 'ocupado', 'empresa'];
    
    const datosFiltrados = {};
    for (const key in nuevosDatos) {
      if (columnasValidas.includes(key) && nuevosDatos[key] !== undefined && nuevosDatos[key] !== null && nuevosDatos[key] !== '') {
        if (key === 'especialidad') {
          datosFiltrados[key] = Number(nuevosDatos[key]);
        } else if (key === 'ocupado') {
          datosFiltrados[key] = nuevosDatos[key] === "1" || nuevosDatos[key] === 1 || nuevosDatos[key] === true ? 1 : 0;
        } else {
          datosFiltrados[key] = nuevosDatos[key];
        }
      }
    }

    const keys = Object.keys(datosFiltrados);
    if (keys.length === 0) {
      return res.status(400).json({ error: "No hay datos para actualizar" });
    }

    const setFragments = [];
    const values = [];
    let i = 1;

    for (const key of keys) {
      setFragments.push(`"${key}" = $${i}`);
      values.push(datosFiltrados[key]);
      i++;
    }

    const query = `
      UPDATE alumnos
      SET ${setFragments.join(", ")}
      WHERE id = $${i}
      RETURNING id
    `;
    values.push(id);

    const rows = await sql.unsafe(query, values);
    
    if (rows.length > 0) {
      res.json({ mensaje: "Alumno actualizado correctamente" });
    } else {
      res.status(404).json({ error: "Alumno no encontrado" });
    }
  } catch (error) {
    console.error("Error al actualizar alumno:", error);
    res.status(500).json({ error: "Error al actualizar alumno" });
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
    
    const fotoUrl = fotoFile ? await uploadToSupabase(fotoFile, "imagenes") : null;
    const cvUrl = cvFile ? await uploadToSupabase(cvFile, "CVs") : null;

    const nuevoId = await modelo.insertarAlumno({
      nombre,
      apellido,
      descripcion,
      foto: fotoUrl,
      cv: cvUrl,
      especialidad: Number(especialidad),
      ocupado: ocupado === "1" || ocupado === 1 || ocupado === true ? 1 : 0,
      empresa: empresa_cuit || null,
    });

    res.status(201).json({ mensaje: "Alumno creado", id: nuevoId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al crear alumno" });
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

async function crearEmpresa(req, res) {
  try {
    const { cuit, razon_social, contrasena } = req.body;

    if (!cuit || !razon_social || !contrasena) {
      return res.status(400).json({ error: "Faltan datos requeridos" });
    }

    const nuevoId = await modelo.insertarEmpresa({ cuit, razon_social, contrasena });

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

    if (error.code === "23503") {
      res.status(400).json({
        error: "No se puede borrar la empresa porque tiene alumnos asignados",
      });
    } else {
      res.status(500).json({ error: "Error al borrar empresa" });
    }
  }
}

async function actualizarEmpresa(req, res) {
  try {
    const { cuit } = req.params;
    const nuevosDatos = { ...req.body };

    const columnasValidas = ['razon_social', 'contrasena'];
    
    const datosFiltrados = {};
    for (const key in nuevosDatos) {
      if (columnasValidas.includes(key) && nuevosDatos[key] !== undefined && nuevosDatos[key] !== null && nuevosDatos[key] !== '') {
        datosFiltrados[key] = nuevosDatos[key];
      }
    }

    const keys = Object.keys(datosFiltrados);
    if (keys.length === 0) {
      return res.status(400).json({ error: "No hay datos para actualizar" });
    }

    const setFragments = [];
    const values = [];
    let i = 1;

    for (const key of keys) {
      setFragments.push(`"${key}" = $${i}`);
      values.push(datosFiltrados[key]);
      i++;
    }

    const query = `
      UPDATE empresas
      SET ${setFragments.join(", ")}
      WHERE cuit = $${i}
      RETURNING cuit
    `;
    values.push(cuit);

    const rows = await sql.unsafe(query, values);
    
    if (rows.length > 0) {
      res.json({ mensaje: "Empresa actualizada correctamente" });
    } else {
      res.status(404).json({ error: "Empresa no encontrada" });
    }
  } catch (error) {
    console.error("Error al actualizar empresa:", error);
    res.status(500).json({ error: "Error al actualizar empresa" });
  }
}

export async function login(req, res) {
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

export default{mostrarAlumnos, detalleAlumno, borrarAlumno, actualizarAlumno, mostrarAlumnosEspecialidad, crearAlumno, mostrarEmpresas, crearEmpresa, borrarEmpresa, actualizarEmpresa, login};