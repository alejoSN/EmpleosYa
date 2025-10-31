import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import upload from "./middleware/archivos.js";
import * as controlador from "./controlador/controlador.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/alumnos", controlador.mostrarAlumnos);
app.get("/alumnos/:id", controlador.detalleAlumno);
app.get("/empresas", controlador.mostrarEmpresas);
app.get("/especialidades/:id", controlador.mostrarAlumnosEspecialidad);

app.post(
  "/alumnos",
  upload.fields([{ name: "foto", maxCount: 1 }, { name: "cv", maxCount: 1 }]),
  controlador.crearAlumno
);
app.post("/empresas", controlador.crearEmpresa);
app.post("/login", controlador.login);

app.put("/empresas/:cuit", controlador.actualizarEmpresa);
app.put(
  "/alumnos/:id",
  upload.fields([{ name: "foto", maxCount: 1 }, { name: "cv", maxCount: 1 }]),
  controlador.actualizarAlumno
);

app.delete("/empresas/:cuit", controlador.borrarEmpresa);
app.delete("/alumnos/:id", controlador.borrarAlumno);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
