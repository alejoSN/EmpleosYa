import "./index.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Especialidades from "./vistas/especialidades";
import Estudiantes from "./vistas/estudiantes";
import Empresas from "./vistas/empresas";
import Login from "./vistas/login";
import Ficha from "./vistas/ficha";
import Crear from "./vistas/crear";
import ProtectedRoute from "./rutasProtegidas/rutasProtegidas";
import { UsuarioProvider } from "./context/usuarioContext";

function App() {
  return (
    <UsuarioProvider>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/especialidades"
          element={
            <ProtectedRoute roles={["admin", "empresa"]}>
              <Especialidades />
            </ProtectedRoute>
          }
        />
        <Route
          path="/especialidades/:id"
          element={
            <ProtectedRoute roles={["admin", "empresa"]}>
              <Estudiantes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/estudiantes"
          element={
            <ProtectedRoute roles={["admin", "empresa"]}>
              <Estudiantes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/estudiantes/:id"
          element={
            <ProtectedRoute roles={["admin", "empresa"]}>
              <Ficha />
            </ProtectedRoute>
          }
        />

        <Route
          path="/crear"
          element={
            <ProtectedRoute roles={["admin"]}>
              <Crear />
            </ProtectedRoute>
          }
        />

        <Route
          path="/empresas"
          element={
            <ProtectedRoute roles={["admin"]}>
              <Empresas />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </UsuarioProvider>
  );
}

export default App;
