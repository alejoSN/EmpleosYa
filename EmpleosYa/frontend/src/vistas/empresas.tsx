import Header from "../componentes/header";
import { useEffect, useState } from "react";

type Empresa = {
    razon_social: string;
    cuit: number;
};

function Empresas() {
    const [empresas, setEmpresas] = useState<Empresa[]>([]);

    useEffect(() => {
        fetch("http://localhost:3000/empresas")
            .then((res) => res.json())
            .then((data) => setEmpresas(data))
            .catch((err) => console.error("Error al cargar empresas:", err));
    }, []);

    return (
        <>
            <Header titulo="Empresas" />
            <section>
                {empresas.map((empresa) => (
                    <div className="empresa" key={empresa.cuit}>
                        <h3>{empresa.razon_social}</h3>
                        <h3>{empresa.cuit}</h3>
                        <div>
                            <button id="borrar">Borrar</button>
                            <button>Modificar</button>
                        </div>
                    </div>
                ))}
            </section>
        </>
    );
}

export default Empresas;
