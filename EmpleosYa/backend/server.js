const express = require('express');
const app = express();
const PORT = 3000;
const controlador = require('./controlador/controlador');
const cors = require('cors');
const path = require('path');
const upload = require('./middleware/upload'); 

app.use(cors());

app.use(express.json());

app.use('/archivos', express.static(path.join(__dirname, 'archivos')));

app.get('/alumnos', controlador.mostrarAlumnos);
app.get('/alumnos/:id', controlador.detalleAlumno);
app.get('/empresas', controlador.mostrarEmpresas);
app.get('/especialidades/:id', controlador.mostrarAlumnosEspecialidad);

app.post('/alumnos', upload.fields([{ name: 'foto', maxCount: 1 }, { name: 'cv', maxCount: 1 }]), controlador.crearAlumno);
app.post('/empresas', upload.none(), controlador.crearEmpresa);

app.put('/empresas/:cuit', controlador.actualizarEmpresa);

app.delete('/empresas/:cuit', controlador.borrarEmpresa);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
