import Header from "../header"
import Tarjeta from "../tarjetas"
import { Link } from "react-router-dom"

function Especialidades(){

    return(
        <>
        <Header titulo="Especialidades"/>
        <section id="especialidades">
            <Link to={"/especialidades/estudiantes"}><Tarjeta nombre="Computacion" descripcion="mucho texto" foto="/computacion.png"/></Link>
            <Link to={"/especialidades/estudiantes"}><Tarjeta nombre="Construcciones" descripcion="mucho texto" foto="/construcciones.png"/></Link>
            <Link to={"/especialidades/estudiantes"}><Tarjeta nombre="Electrica" descripcion="mucho texto" foto="/electrica.png"/></Link>
            <Link to={"/especialidades/estudiantes"}><Tarjeta nombre="Electronica" descripcion="mucho texto" foto="/electronica.png"/></Link>
            <Link to={"/especialidades/estudiantes"}><Tarjeta nombre="Quimica" descripcion="mucho texto" foto="/quimica.png"/></Link>
            <Link to={"/especialidades/estudiantes"}><Tarjeta nombre="Mecanica" descripcion="mucho texto" foto="/mecanica.png"/></Link>
        </section>
        </>
    )
}

export default Especialidades