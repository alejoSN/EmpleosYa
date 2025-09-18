import type { Datos } from "./tipos"

function Alumno({nombre, descripcion, foto}: Datos){

    return(
        <>
        <div className="alumno">
            <img src= {foto} alt="Imagen de alumno" />
            <h2>{nombre}</h2>
            <p>{descripcion}</p>
        </div>
        </>
    )
}

export default Alumno