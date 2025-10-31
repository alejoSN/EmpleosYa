import sql from "./conexion.js";

async function alumnos() {
  return await sql`SELECT id, nombre, apellido, foto, descripcion FROM alumnos`;
}

async function alumnoID(id) {
  const rows = await sql`
    SELECT alumnos.id, alumnos.nombre, alumnos.apellido, alumnos.foto,
           alumnos.cv, alumnos.descripcion, alumnos.ocupado, alumnos.especialidad,
           empresas.razon_social AS empresa
    FROM alumnos
    LEFT JOIN empresas ON alumnos.empresa = empresas.cuit
    WHERE alumnos.id = ${id}
  `;
  return rows[0];
}

async function alumnosEspecialidad(especialidad) {
  return await sql`
    SELECT id, nombre, apellido, foto, descripcion
    FROM alumnos
    WHERE especialidad = ${especialidad}
  `;
}

async function insertarAlumno({ nombre, apellido, descripcion, foto, cv, especialidad, ocupado, empresa }) {
  const rows = await sql`
    INSERT INTO alumnos (nombre, apellido, descripcion, foto, cv, especialidad, ocupado, empresa)
    VALUES (${nombre}, ${apellido}, ${descripcion}, ${foto}, ${cv}, ${especialidad}, ${ocupado}, ${empresa || null})
    RETURNING id
  `;
  return rows[0]?.id;
}

async function borrarAlumno(id) {
  const rows = await sql`DELETE FROM alumnos WHERE id = ${id} RETURNING id`;
  return rows.length;
}

async function actualizarAlumno(id, nuevosDatos) {
  const keys = Object.keys(nuevosDatos);
  if (keys.length === 0) return 0;

  const setClause = keys.map(key => `${key} = ${nuevosDatos[key]}`).join(", ");

  const rows = await sql`
    UPDATE alumnos
    SET ${sql(setClause)}
    WHERE id = ${id}
    RETURNING id
  `;
  return rows.length;
}

async function empresas() {
  return await sql`SELECT * FROM empresas ORDER BY LOWER(razon_social) ASC`;
}

async function insertarEmpresa({ cuit, razon_social, contrasena }) {
  const rows = await sql`
    INSERT INTO empresas (cuit, razon_social, contrasena)
    VALUES (${cuit}, ${razon_social}, ${contrasena})
    RETURNING cuit
  `;
  return rows[0]?.cuit;
}

async function empresaPorCuit(cuit) {
  const rows = await sql`SELECT * FROM empresas WHERE cuit = ${cuit}`;
  return rows[0] || null;
}

async function borrarEmpresa(cuit) {
  const rows = await sql`DELETE FROM empresas WHERE cuit = ${cuit} RETURNING cuit`;
  return rows.length;
}

async function actualizarEmpresa(cuit, nuevosDatos) {
  const keys = Object.keys(nuevosDatos);
  if (keys.length === 0) return 0;

  const setFragments = [];
  const values = [];
  let i = 1;

  for (const key of keys) {
    setFragments.push(`"${key}" = $${i}`);
    values.push(nuevosDatos[key]);
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
  return rows.length;
}

async function administradorPorUsuario(usuario) {
  const rows = await sql`SELECT * FROM administradores WHERE usuario = ${usuario}`;
  return rows[0] || null;
}

async function empresaPorUsuario(usuario) {
  const rows = await sql`SELECT * FROM empresas WHERE razon_social = ${usuario}`;
  return rows[0] || null;
}

export default {alumnos, alumnoID, borrarAlumno, actualizarAlumno, insertarAlumno, alumnosEspecialidad, empresas, insertarEmpresa, borrarEmpresa, actualizarEmpresa, administradorPorUsuario, empresaPorUsuario, empresaPorCuit};
