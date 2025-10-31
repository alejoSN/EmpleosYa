import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../componentes/header";
import { useUsuario } from "../context/usuarioContext";

type Alumno = {
  ID: number;
  nombre: string;
  apellido: string;
  descripcion: string;
  empresa: string | null;
  cv: string;
  foto: string;
};

function Ficha() {
  const { id } = useParams<{ id: string }>();
  const [alumno, setAlumno] = useState<Alumno | null>(null);
  const { tipoUsuario } = useUsuario();
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL; // 🔹 variable de entorno

  useEffect(() => {
    if (!id) return;

    fetch(`${API_URL}/alumnos/${id}`) // 🔹 usar variable de entorno
      .then((res) => res.json())
      .then((data) => setAlumno(data))
      .catch((err) => console.error("Error al cargar alumno:", err));
  }, [id, API_URL]);

  if (!alumno) return <p>Cargando...</p>;

  const borrarAlumno = async () => {
    try {
      const res = await fetch(`${API_URL}/alumnos/${alumno.ID}`, { // 🔹 usar variable de entorno
        method: "DELETE",
      });
      if (res.ok) {
        alert("Alumno borrado correctamente");
        navigate("/estudiantes");
      } else {
        alert("No se pudo borrar el alumno");
      }
    } catch (err) {
      console.error(err);
      alert("Error al intentar borrar el alumno");
    }
  };

  const modificarAlumno = () => {
    navigate(
      `/crear?modo=editar&id=${alumno.ID}&nombre=${alumno.nombre}&apellido=${alumno.apellido}`
    );
  };

  return (
    <>
      <Header titulo={`${alumno.nombre} ${alumno.apellido}`} />

      <div className="ficha">
        <img
          src={alumno.foto ? `${API_URL}/archivos${alumno.foto}` : ""} // 🔹 usar variable de entorno
          alt={`${alumno.nombre} ${alumno.apellido}`}
        />
        <h2>{`${alumno.nombre} ${alumno.apellido}`}</h2>
        <p>{alumno.descripcion}</p>
        <p>
          <strong>Empresa:</strong> {alumno.empresa ?? "Ninguna"}
        </p>
        <a
          href={alumno.cv ? `${API_URL}/archivos${alumno.cv}` : "#"} // 🔹 usar variable de entorno
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver CV
        </a>

        {tipoUsuario === "admin" && (
          <div className="acciones-admin">
            <button id="borrar" onClick={borrarAlumno}>
              Borrar
            </button>
            <button onClick={modificarAlumno}>Modificar</button>
          </div>
        )}
      </div>
    </>
  );
}

export default Ficha;
