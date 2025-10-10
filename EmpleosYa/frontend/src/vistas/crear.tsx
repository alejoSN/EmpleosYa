import { useState } from "react";
import Header from "../componentes/header"
import { Link } from "react-router-dom";

function Crear(){
    const [rol, setRol] = useState('alumno');

    return(
        <>
        <Header titulo="Crear Usuario"/>
        <nav>
            <Link to={"/estudiantes"}><h2>Ver Alumnos</h2></Link>
            <Link to={"/empresas"}><h2>Ver Empresas</h2></Link>
        </nav>
        <section id="admin">
            <form>
                <label>Rol:</label>
                <div>
                    <label htmlFor="alumno">Alumno</label>
                    <input type="radio" id="alumno" name="rol" value="alumno" onChange={()=> setRol("alumno")} checked={rol=="alumno"}/>
                </div>
                <div>
                    <label htmlFor="user">Empresa</label>
                    <input type="radio" id="empresa" name="rol" value="empresa" onChange={()=> setRol("empresa")} />
                </div>
                <br />

                {rol === 'alumno' && (
                    <>
                    <div>
                        <label htmlFor="nombre">Nombre: </label>
                        <input type="text" id="nombre" name="nombre"/>
                    </div>
                    <div>
                        <label htmlFor="descripcion">Descripcion: </label>
                        <textarea id="comentario" name="comentario"></textarea>
                    </div>
                    <div>
                        <label htmlFor="foto">Foto: </label>
                        <input type="file" id="foto" name="foto" accept="image/*" />
                    </div>
                    <div>
                        <label htmlFor="CV">CV: </label>
                        <input type="file" id="CV" name="CV" accept="application/pdf"/>
                    </div>
                    </>
                )}

                {rol === 'empresa' && (
                    <>
                    <div>
                        <label htmlFor="cuit">Cuit: </label>
                        <input type="text" id="cuit" name="cuit"/>
                    </div>
                    <div>
                        <label htmlFor="razon">Nombre / Razon social: </label>
                        <input type="text" id="razon" name="razon"/>
                    </div>
                    </>
                )}
                
                <div>
                    <label htmlFor="contraseña">Contraseña: </label>
                    <input type="password" id="contraseña" name="contraseña"/>
                </div>
                <button>Crear Usuario</button>
            </form>
        </section>
        </>
    )
}

export default Crear