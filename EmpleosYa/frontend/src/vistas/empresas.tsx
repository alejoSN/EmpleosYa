import Header from "../componentes/header"

function Empresas(){

    return(
        <>
        <Header titulo="Empresas"/>
        <section>
            <div className="empresa">
                <h2>Razon social / nombre</h2>
                <h2>CUIT</h2>
                <h2>Acciones</h2>
            </div>

            <div className="empresa">
                <h3>Streambe</h3>
                <h3>1234</h3>
                <div>
                    <button id="borrar">Borrar</button>
                    <button>Modificar</button>
                </div>
            </div>

            <div className="empresa">
                <h3>Globant</h3>
                <h3>5678</h3>
                <div>
                    <button id="borrar">Borrar</button>
                    <button>Modificar</button>
                </div>
            </div>

            <div className="empresa">
                <h3>Acenture</h3>
                <h3>9012</h3>
                <div>
                    <button id="borrar">Borrar</button>
                    <button>Modificar</button>
                </div>
            </div>

            <div className="empresa">
                <h3>Mercado Libre</h3>
                <h3>3456</h3>
                <div>
                    <button id="borrar">Borrar</button>
                    <button>Modificar</button>
                </div>
            </div>
            
            <div className="empresa">
                <h3>Uala</h3>
                <h3>7890</h3>
                <div>
                    <button id="borrar">Borrar</button>
                    <button>Modificar</button>
                </div>
            </div>
        </section>
        </>
    )
}

export default Empresas