import { Link } from "react-router-dom"
import { useUsuario } from "../context/usuarioContext"

type TituloProps = {
  titulo: string
}

function Header({ titulo }: TituloProps) {
  const { tipoUsuario } = useUsuario()

  const destino = tipoUsuario === "empresa" ? "/especialidades" : "/crear"

  return (
    <header>
      <Link to={destino}>
        <img src="/escudo.png" alt="Escudo de la escuela" />
      </Link>
      <h1>{titulo}</h1>
    </header>
  )
}

export default Header
