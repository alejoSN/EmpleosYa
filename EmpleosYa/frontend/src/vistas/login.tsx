import {useNavigate } from "react-router-dom"
import { useState } from "react"

function Login(){
    const navigate=useNavigate()
    const [usuario, setUsuario]=useState("")

    function handlerFormulario(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        if(usuario=="Alejo"){
            navigate("/especialidades")
        }else{
            navigate("/crear")
        }
    }

    return(
        <>
        <section id="login">
            <img src="escudo.png" alt="logo Krause" />
            <h1>Iniciar sesion</h1>
            <form onSubmit={handlerFormulario}>
                <div>
                    <label htmlFor="usuario">Usuario</label>
                    <br />
                    <input type="text" id="usuario" name="username" onChange={e=>setUsuario(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="contrasena">Contraseña</label>
                    <br />
                    <input type="password" id="contrasena" name="contrasena" />
                </div>
                <button type="submit">Entrar</button>
            </form>
        </section>
        </>
    )
}

export default Login