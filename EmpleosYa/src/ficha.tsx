import Header from "./header"
import type { Datos } from "./tipos"


function Ficha({nombre, descripcion, empresa, CV, foto}:Datos){

    return(
        <>
        <Header/>
        <section className="ficha">
            <img src={foto} alt="Foto alumno" />
            <h2>{nombre}</h2>
            <p>{descripcion}</p>
            <h3>Empresa Actual: {empresa}</h3>
            <a href={CV}><h3>Ver CV</h3></a>
        </section>
        </>
    )
}

export default Ficha