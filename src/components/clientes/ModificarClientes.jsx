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
        // Actualizo el estado local inmediatamente
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
        // Actualizo el estado local inmediatamente
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
    <div className="border border-black p-4">
      <h2 className="text-xl mb-4 font-bold">Clientes Registrados</h2>

      {clientes.length === 0 ? (
        <p>No hay clientes para mostrar.</p>
      ) : (
        <div className="space-y-2 mb-4">
          {clientes.map((cli) => (
            <div
              key={cli.id_cliente}
              className="p-2 border border-gray-300 rounded flex justify-between items-center"
            >
              <div>
                <p>
                  <strong>ID:</strong> {cli.id_cliente}
                </p>
                <p>
                  <strong>Nombre:</strong> {cli.nombre} {cli.apellido || ""}
                </p>
                <p>
                  <strong>Teléfono:</strong> {cli.telefono || ""}
                </p>
                <p>
                  <strong>Dirección:</strong> {cli.direccion || ""}
                </p>
                <p>
                  <strong>Correo:</strong> {cli.correo || ""}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleModify(cli.id_cliente)}
                  className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded-full"
                >
                  Modificar
                </button>
                <button
                  onClick={() => handleDelete(cli.id_cliente)}
                  className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded-full"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ModificarClientes;
