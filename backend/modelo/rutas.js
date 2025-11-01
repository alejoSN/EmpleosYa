import supabase from "./supabase.js";

async function alumnos() {
  const { data, error } = await supabase
    .from('alumnos')
    .select('id, nombre, apellido, foto, descripcion');
  
  if (error) throw error;
  return data;
}

async function alumnoID(id) {
  const { data, error } = await supabase
    .from('alumnos')
    .select(`
      id, nombre, apellido, foto, cv, descripcion, ocupado, especialidad,
      empresas!empresa (razon_social)
    `)
    .eq('id', id)
    .single();
  
  if (error) throw error;
  
  if (data && data.empresas) {
    data.empresa = data.empresas.razon_social;
    delete data.empresas;
  }
  
  return data;
}

async function alumnosEspecialidad(especialidad) {
  const { data, error } = await supabase
    .from('alumnos')
    .select('id, nombre, apellido, foto, descripcion')
    .eq('especialidad', especialidad);
  
  if (error) throw error;
  return data;
}

async function insertarAlumno({ nombre, apellido, descripcion, foto, cv, especialidad, ocupado, empresa }) {
  const { data, error } = await supabase
    .from('alumnos')
    .insert({
      nombre,
      apellido,
      descripcion,
      foto,
      cv,
      especialidad,
      ocupado,
      empresa: empresa || null
    })
    .select('id')
    .single();
  
  if (error) throw error;
  return data?.id;
}

async function borrarAlumno(id) {
  const { data, error } = await supabase
    .from('alumnos')
    .delete()
    .eq('id', id)
    .select('id');
  
  if (error) throw error;
  return data.length;
}

async function actualizarAlumno(id, nuevosDatos) {
  const keys = Object.keys(nuevosDatos);
  if (keys.length === 0) return 0;

  const { data, error } = await supabase
    .from('alumnos')
    .update(nuevosDatos)
    .eq('id', id)
    .select('id');
  
  if (error) throw error;
  return data.length;
}

async function empresas() {
  const { data, error } = await supabase
    .from('empresas')
    .select('*')
    .order('razon_social', { ascending: true });
  
  if (error) throw error;
  return data;
}

async function insertarEmpresa({ cuit, razon_social, contrasena }) {
  const { data, error } = await supabase
    .from('empresas')
    .insert({
      cuit,
      razon_social,
      contrasena
    })
    .select('cuit')
    .single();
  
  if (error) throw error;
  return data?.cuit;
}

async function empresaPorCuit(cuit) {
  const { data, error } = await supabase
    .from('empresas')
    .select('*')
    .eq('cuit', cuit)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error;
  return data || null;
}

async function borrarEmpresa(cuit) {
  const { data, error } = await supabase
    .from('empresas')
    .delete()
    .eq('cuit', cuit)
    .select('cuit');
  
  if (error) throw error;
  return data.length;
}

async function actualizarEmpresa(cuit, nuevosDatos) {
  const keys = Object.keys(nuevosDatos);
  if (keys.length === 0) return 0;

  const { data, error } = await supabase
    .from('empresas')
    .update(nuevosDatos)
    .eq('cuit', cuit)
    .select('cuit');
  
  if (error) throw error;
  return data.length;
}

async function administradorPorUsuario(usuario) {
  const { data, error } = await supabase
    .from('administradores')
    .select('*')
    .eq('usuario', usuario)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error;
  return data || null;
}

async function empresaPorUsuario(usuario) {
  const { data, error } = await supabase
    .from('empresas')
    .select('*')
    .eq('razon_social', usuario)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error;
  return data || null;
}

export default {
  alumnos,
  alumnoID,
  borrarAlumno,
  actualizarAlumno,
  insertarAlumno,
  alumnosEspecialidad,
  empresas,
  insertarEmpresa,
  borrarEmpresa,
  actualizarEmpresa,
  administradorPorUsuario,
  empresaPorUsuario,
  empresaPorCuit
};