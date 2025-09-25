import './index.css'
import Especialidades from './vistas/especialidades'
import Estudiantes from './vistas/estudiantes'
import Login from './vistas/login'
import Ficha from './vistas/ficha'
import Admin from './admin'
import {Routes, Route} from 'react-router-dom'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/especialidades' element={<Especialidades/>}/>
      <Route path='/especialidades/estudiantes' element={<Estudiantes/>}/>
      <Route path='/especialidades/estudiantes/estudiante' element={<Ficha nombre="Alejo" descripcion="mucho texto" empresa="Ninguna" CV="computacion.png" foto="/computacion.png"/>}/>
      <Route path='admin' element={< Admin/>}/>
    </Routes>
    </>
  )
}

export default App
