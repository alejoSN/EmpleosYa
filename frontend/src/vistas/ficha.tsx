import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../componentes/header";
import { useUsuario } from "../context/usuarioContext";

type Alumno = {
  id: number;
  nombre: string;
  apellido: string;
  descripcion: string;
  empresa: string | null;
  cv: string;
  foto: string;
  ocupado: number;
};

function Ficha() {
  const { id } = useParams<{ id: string }>();
  const [alumno, setAlumno] = useState<Alumno | null>(null);
  const { tipoUsuario } = useUsuario();
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!id) return;

    fetch(`${API_URL}/alumnos/${id}`)
      .then((res) => res.json())
      .then((data) => setAlumno(data))
      .catch((err) => console.error("Error al cargar alumno:", err));
  }, [id, API_URL]);

  if (!alumno) return <p>Cargando...</p>;

  const borrarAlumno = async () => {
    try {
      const res = await fetch(`${API_URL}/alumnos/${alumno.id}`, {
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
      `/crear?modo=editar&id=${alumno.id}&nombre=${alumno.nombre}&apellido=${alumno.apellido}`
    );
  };

  return (
    <>
      <Header titulo={`${alumno.nombre} ${alumno.apellido}`} />

      <div className="ficha">
        <img src={alumno.foto || "https://gizyiqmkjzdqrpbjjcan.supabase.co/storage/v1/object/public/empleos-archivos/imagenes/images.jpg"} alt={`${alumno.nombre} ${alumno.apellido}`}/>
        <h2>Informacion del alumno</h2>
        <p><strong>Nombre:</strong> {`${alumno.nombre} ${alumno.apellido}`}</p>
        <p><strong>Acerca de mi:</strong> {alumno.descripcion}</p>
        <a href={alumno.cv || "#"} target="_blank"> Ver CV</a>
        <p><strong>Estado:</strong> {alumno.ocupado ? "Ocupado" : "Disponible"}</p>
        <p><strong>Empresa actual:</strong> {alumno.empresa ?? "Ninguna"}</p>

        {tipoUsuario === "admin" && (
          <div>
            <button id="borrar" onClick={borrarAlumno}>Borrar</button>
            <button onClick={modificarAlumno}>Modificar</button>
          </div>
        )}
      </div>
    </>
  );
}

export default Ficha;