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

  useEffect(() => {
    let url = "http://localhost:3000/alumnos";

    if (id) {
      url = `http://localhost:3000/especialidades/${id}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data: Alumno[]) => setAlumnos(data))
      .catch((err) => console.error("Error al cargar alumnos:", err));
  }, [id]);

  return (
    <>
      <Header titulo="Alumnos" />
      <section className="listado">
        {alumnos.map((alumno) => (
          <Link key={alumno.ID} to={`/estudiantes/${alumno.ID}`}>
            <Tarjeta
              nombre={`${alumno.nombre} ${alumno.apellido}`}
              descripcion={alumno.descripcion}
              foto={`http://localhost:3000/archivos${alumno.foto}`}
            />
          </Link>
        ))}
      </section>
    </>
  );
}

export default Estudiantes;
