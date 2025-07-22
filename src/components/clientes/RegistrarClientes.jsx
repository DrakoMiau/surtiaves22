
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
      alert(`✅ Cliente creado, ID: ${data.id}`);

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
    <div className="bg-yellow-50 p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-rose-600 mb-6">Registrar Cliente</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Nombre</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Apellido</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Teléfono</label>
            <input
              type="tel"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Dirección</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Correo</label>
          <input
            type="email"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-rose-600 text-white py-3 rounded-full hover:bg-rose-700 transition-colors"
        >
          Crear Cliente
        </button>
      </form>
    </div>
  );
}

export default RegistrarClientes;

