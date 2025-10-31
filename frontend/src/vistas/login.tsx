import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUsuario } from "../context/usuarioContext";
const API_URL = import.meta.env.VITE_API_URL;

function Login() {
  const navigate = useNavigate();
  const { setTipoUsuario } = useUsuario();

  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  async function handlerFormulario(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    try {
        const respuesta = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, contrasena }),
      });



      if (!respuesta.ok) {
        throw new Error("Usuario o contraseña incorrectos");
      }

      const datos = await respuesta.json();
      setTipoUsuario(datos.tipo);

      if (datos.tipo === "admin") {
        navigate("/crear");
      } else if (datos.tipo === "empresa") {
        navigate("/especialidades");
      }
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <section id="login">
      <img src="escudo.png" alt="logo Krause" />
      <h1>Iniciar sesión</h1>
      <form onSubmit={handlerFormulario}>
        <div>
          <label htmlFor="usuario">Usuario</label>
          <br />
          <input
            type="text"
            id="usuario"
            name="usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="contrasena">Contraseña</label>
          <br />
          <input
            type="password"
            id="contrasena"
            name="contrasena"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
        </div>
        <button type="submit">Entrar</button>
        {error && <p>{error}</p>}
      </form>
    </section>
  );
}

export default Login;
