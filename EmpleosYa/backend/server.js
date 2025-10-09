const express = require('express');
const app = express();
const PORT = 3000;
const vistas = require('./vistas');

app.use(express.json());

app.get('/alumnos', vistas.mostrarLista);
app.get('/alumnos/:id', vistas.mostrarDetalle);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
