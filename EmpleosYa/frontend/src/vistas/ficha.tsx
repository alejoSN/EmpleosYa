import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

type Alumno = {
  ID: number;
  nombre: string;
  apellido: string;
  descripcion: string;
  empresa: string;
  CV: string;
  foto: string;
};

function Ficha() {
  const {id} = useParams<{ id: string }>();
  const [alumno, setAlumno] = useState<Alumno | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/alumnos/${id}`)
      .then((res) => res.json())
      .then((data) => setAlumno(data))
      .catch((err) => console.error("Error al cargar alumno:", err));
  }, [id]);

  if (!alumno) return <p>Cargando...</p>;

  return (
    <div className="ficha">
      <img src={alumno.foto} alt={`${alumno.nombre}`} />
      <h2>{`${alumno.nombre} ${alumno.apellido}`}</h2>
      <p>{alumno.descripcion}</p>
      <p><strong>Empresa:</strong> {alumno.empresa}</p>
      <a href={alumno.CV} target="_blank">Ver CV</a>
    </div>
  );
}

export default Ficha;
