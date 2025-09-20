function Login(){

    return(
        <>
        <section id="login">
            <img src="escudo.png" alt="logo Krause" />
            <h1>Iniciar sesion</h1>
            <form>
                <div>
                    <label htmlFor="usuario">Usuario</label>
                    <br />
                    <input type="text" id="usuario" name="username" />
                </div>
                <div>
                    <label htmlFor="contraseña">Contraseña</label>
                    <br />
                    <input type="password" id="contraseña" name="password" />
                </div>
                <button type="submit">Entrar</button>
            </form>
        </section>
        </>
    )
}

export default Login