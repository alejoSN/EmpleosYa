const express = require("express");
const app = express();
const controlador = require("./controlador/controlador");
const cors = require("cors");
const path = require("path");
const upload = require("./middleware/archivos"); 
require("dotenv").config(); // carga variables de entorno

// 🔹 Puerto dinámico para Render
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/archivos", express.static(path.join(__dirname, "archivos")));

// Rutas
app.get("/alumnos", controlador.mostrarAlumnos);
app.get("/alumnos/:id", controlador.detalleAlumno);
app.get("/empresas", controlador.mostrarEmpresas);
app.get("/especialidades/:id", controlador.mostrarAlumnosEspecialidad);

app.post("/alumnos", upload.fields([{ name: "foto", maxCount: 1 }, { name: "cv", maxCount: 1 }]), controlador.crearAlumno);
app.post("/empresas", controlador.crearEmpresa);
app.post("/login", controlador.login);

app.put("/empresas/:cuit", controlador.actualizarEmpresa);
app.put("/alumnos/:id", upload.fields([{ name: "foto", maxCount: 1 }, { name: "cv", maxCount: 1 }]), controlador.actualizarAlumno);

app.delete("/empresas/:cuit", controlador.borrarEmpresa);
app.delete("/alumnos/:id", controlador.borrarAlumno);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
