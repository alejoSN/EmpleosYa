import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

type TipoUsuario = "admin" | "empresa" | null;

type UsuarioContextType = {
  tipoUsuario: TipoUsuario | undefined;
  setTipoUsuario: (tipo: TipoUsuario) => void;
};

const UsuarioContext = createContext<UsuarioContextType | undefined>(undefined);

export const UsuarioProvider = ({ children }: { children: ReactNode }) => {
  const [tipoUsuario, setTipoUsuarioState] = useState<TipoUsuario | undefined>(undefined);

  useEffect(() => {
    const guardado = sessionStorage.getItem("tipoUsuario");
    if (guardado === "admin" || guardado === "empresa") {
      setTipoUsuarioState(guardado);
    } else {
      setTipoUsuarioState(null);
    }
  }, []);

  const setTipoUsuario = (tipo: TipoUsuario) => {
    setTipoUsuarioState(tipo);
    if (tipo) {
      sessionStorage.setItem("tipoUsuario", tipo);
    } else {
      sessionStorage.removeItem("tipoUsuario");
    }
  };

  return (
    <UsuarioContext.Provider value={{ tipoUsuario, setTipoUsuario }}>
      {children}
    </UsuarioContext.Provider>
  );
};

export const useUsuario = () => {
  const context = useContext(UsuarioContext);
  if (!context) throw new Error("useUsuario debe usarse dentro de UsuarioProvider");
  return context;
};
