
import { useState } from "react";

function RegistrarClientes() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [correo, setCorreo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/clientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          apellido: apellido || null,
          telefono: telefono || null,
          direccion: direccion || null,
          correo: correo || null,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(`Error: ${errorData.error || "No se pudo crear el cliente."}`);
        return;
      }

      const data = await res.json();
      console.log("Cliente creado:", data);
      alert(`Cliente creado, ID: ${data.id}`);

      // Limpiar formulario
      setNombre("");
      setApellido("");
      setTelefono("");
      setDireccion("");
      setCorreo("");
    } catch (err) {
      console.error("Error al crear cliente:", err);
      alert("Error de red al crear cliente.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
      <h2 className="text-xl font-bold">Registrar Cliente</h2>

      <div>
        <label>Nombre:</label>
        <input
          type="text"
          className="bg-blue-50 w-full p-1"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Apellido:</label>
        <input
          type="text"
          className="bg-blue-50 w-full p-1"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />
      </div>

      <div>
        <label>Teléfono:</label>
        <input
          type="tel"
          className="bg-blue-50 w-full p-1"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
      </div>

      <div>
        <label>Dirección:</label>
        <input
          type="text"
          className="bg-blue-50 w-full p-1"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />
      </div>

      <div>
        <label>Correo:</label>
        <input
          type="email"
          className="bg-blue-50 w-full p-1"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
      >
        Registrar Cliente
      </button>
    </form>
  );
}

export default RegistrarClientes;
