import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../componentes/header";

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

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:3000/alumnos/${id}`)
      .then((res) => res.json())
      .then((data) => setAlumno(data))
      .catch((err) => console.error("Error al cargar alumno:", err));
  }, [id]);

  if (!alumno) return <p>Cargando...</p>;

  return (
    <>
    <Header titulo={`${alumno.nombre} ${alumno.apellido}`} />

    <div className="ficha">
      <img
        src={`http://localhost:3000/archivos${alumno.foto}`}
        alt={`${alumno.nombre} ${alumno.apellido}`}
      />
      <h2>{`${alumno.nombre} ${alumno.apellido}`}</h2>
      <p>{alumno.descripcion}</p>
      <p><strong>Empresa:</strong> {alumno.empresa ?? "Ninguna"}</p>
      <a href={`http://localhost:3000/archivos${alumno.cv}`} target="_blank">
        Ver CV
      </a>
    </div>
    </>
  );
}

export default Ficha;
