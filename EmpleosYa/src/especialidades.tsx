import Header from "./header"
import Tarjeta from "./tarjetas"

function Especialidades(){

    return(
        <>
        <Header/>
        <section id="especialidades">
            <Tarjeta nombre="Computacion" descripcion="mucho texto" foto="computacion.png"/>
            <Tarjeta nombre="Construcciones" descripcion="mucho texto" foto="construcciones.png"/>
            <Tarjeta nombre="Electrica" descripcion="mucho texto" foto="electrica.png"/>
            <Tarjeta nombre="Electronica" descripcion="mucho texto" foto="electronica.png"/>
            <Tarjeta nombre="Quimica" descripcion="mucho texto" foto="quimica.png"/>
            <Tarjeta nombre="Mecanica" descripcion="mucho texto" foto="mecanica.png"/>
        </section>
        </>
    )
}

export default Especialidades