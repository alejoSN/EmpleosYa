import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
    const [alumnos, setAlumnos] = useState<Alumno[]>([]);

    useEffect(() => {
        fetch("http://localhost:3000/alumnos")
        .then((res) => res.json())
        .then((data: Alumno[]) => setAlumnos(data))
        .catch((err) => console.error("Error al cargar alumnos:", err));
    }, []);

    return (
        <>
        <Header titulo="Alumnos" />
        <section className="listado">
            {alumnos.map((alumno) => (
            <Link key={alumno.ID} to={`/estudiantes/${alumno.ID}`}>
                <Tarjeta nombre={`${alumno.nombre} ${alumno.apellido}`} descripcion={alumno.descripcion} foto={alumno.foto}/>
            </Link>

            ))}
        </section>
        </>
    );
}

export default Estudiantes;


