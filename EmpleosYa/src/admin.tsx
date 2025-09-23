import Header from "./header"

function Admin(){

    return(
        <>
        <Header titulo="Crear Usuario"/>
        <section id="admin">
            <form>
                <label>Rol:</label>
                <div>
                    <label htmlFor="admin">Alumno</label>
                    <input type="radio" id="alumno" name="rol" value="alumno" />
                </div>
                <div>
                    <label htmlFor="user">Empresa</label>
                    <input type="radio" id="empresa" name="rol" value="empresa" />
                </div>
                <br />
                <div>
                    <label htmlFor="nombre">Nombre: </label>
                    <input type="text" id="nombre" name="nombre"/>
                </div>
                <div>
                    <label htmlFor="descripcion">Descripcion: </label>
                    <textarea id="comentario" name="comentario"></textarea>
                </div>
                <div>
                    <label htmlFor="empresaActual">Empresa actual: </label>
                    <input type="text" id="empresaActual" name="empresaActual"/>
                </div>
                <div>
                    <label htmlFor="foto">Foto: </label>
                    <input type="file" id="foto" name="foto" accept="image/*" />
                </div>
                <div>
                    <label htmlFor="CV">CV: </label>
                    <input type="file" id="CV" name="CV" accept="application/pdf"/>
                </div>
                <br />
                <div>
                    <label htmlFor="cuit">Cuit: </label>
                    <input type="text" id="cuit" name="cuit"/>
                </div>
                <div>
                    <label htmlFor="razon">Nombre / Razon social: </label>
                    <input type="text" id="razon" name="razon"/>
                </div>
                <button>Crear Usuario</button>
            </form>
        </section>
        </>
    )
}

export default Admin