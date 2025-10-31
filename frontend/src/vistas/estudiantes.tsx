import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Tarjeta from "../componentes/tarjetas";
import Header from "../componentes/header";

type Alumno = {
  ID: number;
  nombre: string;
  apellido: string;
  descripcion: string;
  foto: string;
};

function Estudiantes() {
  const { id } = useParams<{ id?: string }>();
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);

  const API_URL = import.meta.env.VITE_API_URL; // 🔹 variable de entorno

  useEffect(() => {
    let url = `${API_URL}/alumnos`; // 🔹 usar variable de entorno

    if (id) {
      url = `${API_URL}/especialidades/${id}`; // 🔹 usar variable de entorno
    }

    fetch(url)
      .then((res) => res.json())
      .then((data: Alumno[]) => setAlumnos(data))
      .catch((err) => console.error("Error al cargar alumnos:", err));
  }, [id, API_URL]);

  return (
    <>
      <Header titulo="Alumnos" />
      <section className="listado">
        {alumnos.map((alumno) => (
          <Link key={alumno.ID} to={`/estudiantes/${alumno.ID}`}>
            <Tarjeta
              nombre={`${alumno.nombre} ${alumno.apellido}`}
              descripcion={alumno.descripcion}
              foto={alumno.foto ? `${API_URL}/archivos${alumno.foto}` : ""} // 🔹 usar variable de entorno
            />
          </Link>
        ))}
      </section>
    </>
  );
}

export default Estudiantes;
