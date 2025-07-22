import { useState, useEffect } from "react";

function ModificarClientes() {
  const [clientes, setClientes] = useState([]);

  // Carga inicial de clientes
  useEffect(() => {
    fetch("http://localhost:3001/clientes")
      .then((res) => res.json())
      .then(setClientes)
      .catch((err) => console.error("Error al obtener clientes:", err));
  }, []);

  // Eliminar un cliente
  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que quieres eliminar este cliente?")) return;

    try {
      const res = await fetch(`http://localhost:3001/clientes/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setClientes((prev) => prev.filter((cli) => cli.id_cliente !== id));
      } else {
        const { error } = await res.json();
        alert(`No se pudo eliminar: ${error}`);
      }
    } catch (err) {
      console.error("Error eliminando cliente:", err);
    }
  };

  // Modificar un cliente
  const handleModify = async (id) => {
    const nombre = prompt("Nuevo nombre:");
    if (!nombre) return alert("El nombre no puede estar vacío.");

    const apellido = prompt("Nuevo apellido:");
    const telefono = prompt("Nuevo teléfono:");
    const direccion = prompt("Nueva dirección:");
    const correo = prompt("Nuevo correo:");

    try {
      const res = await fetch(`http://localhost:3001/clientes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, apellido, telefono, direccion, correo }),
      });

      if (res.ok) {
        setClientes((prev) =>
          prev.map((cli) =>
            cli.id_cliente === id
              ? { ...cli, nombre, apellido, telefono, direccion, correo }
              : cli,
          ),
        );
      } else {
        const { error } = await res.json();
        alert(`No se pudo modificar: ${error}`);
      }
    } catch (err) {
      console.error("Error modificando cliente:", err);
    }
  };

  return (
    <div className="bg-yellow-50 h-full p-8 overflow-auto">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-extrabold text-rose-600 mb-6">
          🐔 Clientes Registrados
        </h2>
        {clientes.length === 0 ? (
          <p className="text-gray-600">No hay clientes para mostrar.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {clientes.map((cli) => (
              <div
                key={cli.id_cliente}
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
              >
                <p className="text-sm text-gray-500 mb-2">
                  ID: {cli.id_cliente}
                </p>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {cli.nombre} {cli.apellido || ""}
                </h3>
                <ul className="text-gray-700 space-y-1 mb-4">
                  {cli.telefono && <li>📞 {cli.telefono}</li>}
                  {cli.direccion && <li>🏠 {cli.direccion}</li>}
                  {cli.correo && <li>✉️ {cli.correo}</li>}
                </ul>
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleModify(cli.id_cliente)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-full transition-colors"
                  >
                    Modificar
                  </button>
                  <button
                    onClick={() => handleDelete(cli.id_cliente)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-full transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ModificarClientes;
