import { useUsuario } from "../context/usuarioContext";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

type ProtectedRouteProps = {
  children: ReactNode;
  roles?: ("admin" | "empresa")[];
};

const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  const { tipoUsuario } = useUsuario();

  if (tipoUsuario === undefined) return <p>Cargando...</p>;

  if (!tipoUsuario || (roles && !roles.includes(tipoUsuario))) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
