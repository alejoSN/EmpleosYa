import type { Datos } from "../tipos"

function Tarjeta({nombre, descripcion, foto}: Datos){

    return(
        <div className="tarjeta">
            <img src= {foto} alt="Imagen" />
            <h2>{nombre}</h2>
            <p>{descripcion}</p>
        </div>
    )
}

export default Tarjeta