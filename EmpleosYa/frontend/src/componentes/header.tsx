import { Link } from "react-router-dom"

type TituloProps = {
  titulo: string
}

function Header({ titulo }: TituloProps) {
  return (
    <header>
      <Link to={"/especialidades"}>
        <img src="/escudo.png" alt="Escudo de la escuela" />
      </Link>
      <h1>{titulo}</h1>
    </header>
  )
}

export default Header
