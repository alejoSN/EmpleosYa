import { useState, useEffect } from "react";
import Header from "../componentes/header";
import { Link, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

type Empresa = {
  cuit: string;
  razon_social: string;
};

function Crear() {
  const API_URL = import.meta.env.VITE_API_URL; // 🔹 usar variable de entorno

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const modo = searchParams.get("modo");
  const idParam = searchParams.get("id");
  const cuitParam = searchParams.get("cuit");
  const razonParam = searchParams.get("razon");

  const [rol, setRol] = useState<"alumno" | "empresa">("alumno");

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [especialidad, setEspecialidad] = useState("1");
  const [ocupado, setOcupado] = useState(false);
  const [empresaAsignada, setEmpresaAsignada] = useState("");

  const [cuit, setCuit] = useState("");
  const [razon, setRazon] = useState("");
  const [contrasena, setContrasena] = useState("");

  const [empresas, setEmpresas] = useState<Empresa[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/empresas`) // 🔹 cambiar ruta
      .then((res) => res.json())
      .then((data: Empresa[]) => setEmpresas(data))
      .catch((err) => console.error("Error al cargar empresas:", err));
  }, [API_URL]);

  useEffect(() => {
    if (cuitParam || razonParam) {
      setRol("empresa");
      if (cuitParam) setCuit(cuitParam);
      if (razonParam) setRazon(razonParam);
    }

    if (modo === "editar" && idParam) {
      setRol("alumno");
      fetch(`${API_URL}/alumnos/${idParam}`) // 🔹 cambiar ruta
        .then((res) => res.json())
        .then((data) => {
          setNombre(data.nombre || "");
          setApellido(data.apellido || "");
          setDescripcion(data.descripcion || "");
          setEspecialidad(String(data.especialidad ?? "1"));
          setOcupado(Boolean(data.ocupado));
          setEmpresaAsignada(data.empresa ?? "");
        })
        .catch((err) => console.error("Error al cargar alumno:", err));
    }

    if (modo === "editar" && cuitParam) {
      setRol("empresa");
      setCuit(cuitParam);
      if (razonParam) setRazon(razonParam);
    }
  }, [modo, idParam, cuitParam, razonParam, API_URL]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      if (rol === "alumno") {
        if (!nombre.trim() || !especialidad) {
          alert("Completar nombre y especialidad");
          return;
        }

        const form = new FormData();
        form.append("nombre", nombre);
        form.append("apellido", apellido);
        form.append("descripcion", descripcion);
        form.append("especialidad", especialidad);
        form.append("ocupado", ocupado ? "1" : "0");
        if (ocupado && empresaAsignada) form.append("empresa", empresaAsignada);
        if (fotoFile) form.append("foto", fotoFile);
        if (cvFile) form.append("cv", cvFile);

        if (modo === "editar" && idParam) {
          const res = await fetch(`${API_URL}/alumnos/${idParam}`, {
            method: "PUT",
            body: form,
          });

          if (!res.ok) throw new Error("Error al actualizar alumno");
          alert("Alumno actualizado correctamente");
          navigate("/estudiantes");
          return;
        }

        const res = await fetch(`${API_URL}/alumnos`, {
          method: "POST",
          body: form,
        });

        if (!res.ok) throw new Error("Error al crear alumno");
        navigate("/estudiantes");
        return;
      }

      if (rol === "empresa") {
        if (!cuit.trim() || !razon.trim() || !contrasena.trim()) {
          alert("Completar CUIT, razón social y contraseña");
          return;
        }

        const datos = {
          cuit,
          razon_social: razon,
          contrasena,
        };

        if (modo === "editar" && cuitParam) {
          const res = await fetch(`${API_URL}/empresas/${cuitParam}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos),
          });

          if (!res.ok) throw new Error("Error al actualizar empresa");
          navigate("/empresas");
          return;
        }

        const res = await fetch(`${API_URL}/empresas`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(datos),
        });

        if (!res.ok) {
          const errText = await res.text();
          console.error("respuesta error:", errText);
          throw new Error("Error al crear empresa");
        }

        navigate("/empresas");
      }
    } catch (err) {
      console.error(err);
      alert("Error al enviar formulario: " + (err as any).message);
    }
  }

  return (
    <>
      <Header titulo="Crear Usuario" />
      <nav>
        <Link to={"/estudiantes"}>
          <h2>Ver Alumnos</h2>
        </Link>
        <Link to={"/empresas"}>
          <h2>Ver Empresas</h2>
        </Link>
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
                    <option value="">Seleccionar Empresa</option>
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
                  disabled={modo === "editar" && Boolean(cuitParam)}
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
              <div>
                <label htmlFor="contrasena">Contraseña: </label>
                <input
                  type="password"
                  id="contrasena"
                  name="contrasena"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          <button type="submit">
            {modo === "editar" ? "Guardar Cambios" : "Crear Usuario"}
          </button>
        </form>
      </section>
    </>
  );
}

export default Crear;
