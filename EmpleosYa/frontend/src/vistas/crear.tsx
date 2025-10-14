import { useState, useEffect } from "react";
import Header from "../componentes/header";
import { Link, useNavigate } from "react-router-dom";

type Empresa = {
  cuit: string;
  razon_social: string;
};

function Crear() {
  const [rol, setRol] = useState<"alumno" | "empresa">("alumno");

  // Campos alumno
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [especialidad, setEspecialidad] = useState("1"); // default Computacion
  const [ocupado, setOcupado] = useState(false);
  const [empresaAsignada, setEmpresaAsignada] = useState("");

  // Campos empresa
  const [cuit, setCuit] = useState("");
  const [razon, setRazon] = useState("");

  const [contrasena, setcontrasena] = useState("");
  const [empresas, setEmpresas] = useState<Empresa[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/empresas")
      .then((res) => res.json())
      .then((data: Empresa[]) => setEmpresas(data))
      .catch((err) => console.error("Error al cargar empresas:", err));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      if (rol === "alumno") {
        const form = new FormData();
        form.append("nombre", nombre);
        form.append("apellido", apellido);
        form.append("descripcion", descripcion);
        form.append("especialidad", especialidad);
        form.append("ocupado", ocupado ? "1" : "0");
        if (ocupado && empresaAsignada) form.append("empresa_cuit", empresaAsignada);

        if (fotoFile) form.append("foto", fotoFile);
        if (cvFile) form.append("cv", cvFile);

        form.append("contrasena", contrasena);
        const res = await fetch("http://localhost:3000/alumnos", {
          method: "POST",
          body: form,
        });
        if (!res.ok) throw new Error("Error al crear alumno");

        navigate("/estudiantes");
      } else {
        const form = new FormData();
        form.append("cuit", cuit);
        form.append("razon", razon);
        form.append("contrasena", contrasena);

        const res = await fetch("http://localhost:3000/empresas", {
          method: "POST",
          body: form,
        });
        if (!res.ok) throw new Error("Error al crear empresa");

        navigate("/empresas");
      }
    } catch (err) {
      console.error(err);
      alert("Error al crear usuario");
    }
  }

  return (
    <>
      <Header titulo="Crear Usuario" />
      <nav>
        <Link to={"/estudiantes"}><h2>Ver Alumnos</h2></Link>
        <Link to={"/empresas"}><h2>Ver Empresas</h2></Link>
      </nav>

      <section id="admin">
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <label>Rol:</label>
          <div>
            <label htmlFor="alumno">Alumno</label>
            <input
              type="radio"
              id="alumno"
              name="rol"
              value="alumno"
              onChange={() => setRol("alumno")}
              checked={rol === "alumno"}
            />
          </div>
          <div>
            <label htmlFor="empresa">Empresa</label>
            <input
              type="radio"
              id="empresa"
              name="rol"
              value="empresa"
              onChange={() => setRol("empresa")}
              checked={rol === "empresa"}
            />
          </div>

          <br />

          {rol === "alumno" && (
            <>
              <div>
                <label htmlFor="nombre">Nombre: </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="apellido">Apellido: </label>
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="descripcion">Descripcion: </label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="especialidad">Especialidad:</label>
                <select
                  id="especialidad"
                  name="especialidad"
                  value={especialidad}
                  onChange={(e) => setEspecialidad(e.target.value)}
                >
                  <option value="1">Computacion</option>
                  <option value="2">Construcciones</option>
                  <option value="3">Electrica</option>
                  <option value="4">Electronica</option>
                  <option value="5">Quimica</option>
                  <option value="6">Mecanica</option>
                </select>
              </div>

              <div>
                <label htmlFor="ocupado">Ocupado:</label>
                <input
                  type="checkbox"
                  id="ocupado"
                  checked={ocupado}
                  onChange={(e) => setOcupado(e.target.checked)}
                />
              </div>

              {ocupado && (
                <div>
                  <label htmlFor="empresaAsignada">Empresa:</label>
                  <select
                    id="empresaAsignada"
                    name="empresaAsignada"
                    value={empresaAsignada}
                    onChange={(e) => setEmpresaAsignada(e.target.value)}
                  >
                    <option value="">--Seleccionar Empresa--</option>
                    {empresas.map((empresa) => (
                      <option key={empresa.cuit} value={empresa.cuit}>
                        {empresa.razon_social}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label htmlFor="foto">Foto: </label>
                <input
                  type="file"
                  id="foto"
                  name="foto"
                  accept="image/*"
                  onChange={(e) => setFotoFile(e.target.files?.[0] ?? null)}
                />
              </div>

              <div>
                <label htmlFor="cv">CV: </label>
                <input
                  type="file"
                  id="cv"
                  name="cv"
                  accept="application/pdf"
                  onChange={(e) => setCvFile(e.target.files?.[0] ?? null)}
                />
              </div>
            </>
          )}

          {rol === "empresa" && (
            <>
              <div>
                <label htmlFor="cuit">Cuit: </label>
                <input
                  type="text"
                  id="cuit"
                  name="cuit"
                  value={cuit}
                  onChange={(e) => setCuit(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="razon">Nombre / Razon social: </label>
                <input
                  type="text"
                  id="razon"
                  name="razon"
                  value={razon}
                  onChange={(e) => setRazon(e.target.value)}
                />
              </div>
            </>
          )}

          <div>
            <label htmlFor="contrasena">Contraseña: </label>
            <input
              type="contrasena"
              id="contrasena"
              name="contrasena"
              value={contrasena}
              onChange={(e) => setcontrasena(e.target.value)}
              required
            />
          </div>

          <button type="submit">Crear Usuario</button>
        </form>
      </section>
    </>
  );
}

export default Crear;
