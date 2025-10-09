import Tarjeta from "../componentes/tarjetas";
import Header from "../componentes/header"
import { Link } from "react-router-dom";

function Estudiantes(){

    return(
        <>
        <Header titulo="Alumnos"/>
        <section className="listado">
            <Link to={"/especialidades/estudiantes/estudiante"}><Tarjeta nombre="Alejo" descripcion="mucho texto" foto="/computacion.png"/></Link>
            <Link to={"/especialidades/estudiantes/estudiante"}><Tarjeta nombre="Alejo" descripcion="mucho texto" foto="/computacion.png"/></Link>
            <Link to={"/especialidades/estudiantes/estudiante"}><Tarjeta nombre="Alejo" descripcion="mucho texto" foto="/computacion.png"/></Link>
            <Link to={"/especialidades/estudiantes/estudiante"}><Tarjeta nombre="Alejo" descripcion="mucho texto" foto="/computacion.png"/></Link>
            <Link to={"/especialidades/estudiantes/estudiante"}><Tarjeta nombre="Alejo" descripcion="mucho texto" foto="/computacion.png"/></Link>
            <Link to={"/especialidades/estudiantes/estudiante"}><Tarjeta nombre="Alejo" descripcion="mucho texto" foto="/computacion.png"/></Link>
            <Link to={"/especialidades/estudiantes/estudiante"}><Tarjeta nombre="Alejo" descripcion="mucho texto" foto="/computacion.png"/></Link>
            <Link to={"/especialidades/estudiantes/estudiante"}><Tarjeta nombre="Alejo" descripcion="mucho texto" foto="/computacion.png"/></Link>
            <Link to={"/especialidades/estudiantes/estudiante"}><Tarjeta nombre="Alejo" descripcion="mucho texto" foto="/computacion.png"/></Link>
            <Link to={"/especialidades/estudiantes/estudiante"}><Tarjeta nombre="Alejo" descripcion="mucho texto" foto="/computacion.png"/></Link>
            <Link to={"/especialidades/estudiantes/estudiante"}><Tarjeta nombre="Alejo" descripcion="mucho texto" foto="/computacion.png"/></Link>
        </section>
        </>
    )
}

export default Estudiantes