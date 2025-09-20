import './index.css'
import Especialidades from './especialidades'
import Estudiantes from './estudiantes'
import Login from './login'
import Ficha from './ficha'
import Admin from './admin'

function App() {

  return (
    <>
    <Login/>
    <Especialidades/>
    <Estudiantes/>
    <Ficha nombre="Alejo" descripcion="mucho texto" empresa="Ninguna" CV="computacion.png" foto="computacion.png"/>
    <Admin/>
    </>
  )
}

export default App
