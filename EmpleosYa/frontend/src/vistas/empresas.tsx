import Header from "../componentes/header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Empresa = {
    razon_social: string;
    cuit: number;
};

function Empresas() {
    const [empresas, setEmpresas] = useState<Empresa[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3000/empresas")
            .then((res) => res.json())
            .then((data) => setEmpresas(data))
            .catch((err) => console.error("Error al cargar empresas:", err));
    }, []);

    const borrarEmpresa = async (cuit: number) => {
        try {
            const res = await fetch(`http://localhost:3000/empresas/${cuit}`, {
                method: "DELETE",
            });
            if (!res.ok) {
                alert("No se puede borrar la empresa porque tiene alumnos asignados");
                throw new Error("Error al borrar empresa");
            }
            setEmpresas(empresas.filter((e) => e.cuit !== cuit));
        } catch (err) {
            console.error(err);
        }
    };

    const modificarEmpresa = (empresa: Empresa) => {
        navigate(`/crear?modo=editar&cuit=${empresa.cuit}&razon=${empresa.razon_social}`);
    };

    return (
        <>
            <Header titulo="Empresas" />
            <section>
                {empresas.map((empresa) => (
                    <div className="empresa" key={empresa.cuit}>
                        <h3>{empresa.razon_social}</h3>
                        <h3>{empresa.cuit}</h3>
                        <div>
                            <button id="borrar" onClick={() => borrarEmpresa(empresa.cuit)}>
                                Borrar
                            </button>
                            <button onClick={() => modificarEmpresa(empresa)}>
                                Modificar
                            </button>
                        </div>
                    </div>
                ))}
            </section>
        </>
    );
}

export default Empresas;
