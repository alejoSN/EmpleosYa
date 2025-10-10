import './index.css'
import Especialidades from './vistas/especialidades'
import Estudiantes from './vistas/estudiantes'
import Empresas from './vistas/empresas'
import Login from './vistas/login'
import Ficha from './vistas/ficha'
import {Routes, Route} from 'react-router-dom'
import Crear from './vistas/crear'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/especialidades' element={<Especialidades/>}/>
      <Route path='/estudiantes' element={<Estudiantes/>}/>
      <Route path="/:idespecialidad/estudiantes" element={<Estudiantes />} />
      <Route path='/especialidades/estudiantes/estudiante' element={<Ficha nombre="Alejo" descripcion="mucho texto" empresa="Ninguna" CV="computacion.png" foto="/computacion.png"/>}/>
      <Route path='crear' element={<Crear/>}/>
      <Route path='/empresas' element={<Empresas/>}/>
    </Routes>
    </>
  )
}

export default App
