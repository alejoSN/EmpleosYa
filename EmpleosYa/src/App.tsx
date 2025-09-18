import './index.css'
import Estudiantes from './estudiantes'
import Login from './login'
import Ficha from './ficha'

function App() {

  return (
    <>
    <Login/>
    <Estudiantes/>
    <Ficha nombre="Alejo" descripcion="mucho texto" empresa="Ninguna" CV="computacion.png" foto="computacion.png"/>
    </>
  )
}

export default App
