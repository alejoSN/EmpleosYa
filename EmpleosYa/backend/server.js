const express = require('express');
const app = express();
const PORT = 3000;
const vistas = require('./vistas/vistas');
const cors = require('cors');
const path = require('path');

app.use(cors());

app.use(express.json());

app.use('/archivos', express.static(path.join(__dirname, 'archivos')));

app.get('/alumnos', vistas.mostrarLista);
app.get('/alumnos/:id', vistas.mostrarDetalle);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
