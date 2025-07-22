import { useState, useEffect } from "react";

function Modificar() {
  const [pedidos, setPedidos] = useState([]);

  // Cargar pedidos al montar
  useEffect(() => {
    fetch("http://localhost:3001/pedidos")
      .then((res) => res.json())
      .then((data) => setPedidos(data))
      .catch((err) => console.error("Error fetching pedidos:", err));
  }, []);

  // Eliminar un pedido
  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que quieres eliminar este pedido?")) return;
    try {
      const res = await fetch(`http://localhost:3001/pedidos/${id}`, {
        method: "DELETE",
      });
      if (res.ok) setPedidos((p) => p.filter((ped) => ped.id_pedido !== id));
    } catch (err) {
      console.error("Error eliminando:", err);
    }
  };

  // Modificar estado de un pedido
  const handleModify = async (id) => {
    const nuevoEstado = prompt("Nuevo estado:");
    if (!nuevoEstado) return;
    try {
      const res = await fetch(`http://localhost:3001/pedidos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: nuevoEstado }),
      });
      if (res.ok) {
        setPedidos((p) =>
          p.map((ped) =>
            ped.id_pedido === id ? { ...ped, estado: nuevoEstado } : ped,
          ),
        );
      }
    } catch (err) {
      console.error("Error modificando:", err);
    }
  };

  return (
    <div className="bg-yellow-50 h-full p-8 overflow-auto">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-extrabold text-rose-600 mb-6">
          🐔 Pedidos (Ventas)
        </h2>

        {pedidos.length === 0 ? (
          <p className="text-gray-600">No hay pedidos para mostrar.</p>
        ) : (
          <div className="space-y-6">
            {pedidos.map((ped) => (
              <div
                key={ped.id_pedido}
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow flex flex-col sm:flex-row justify-between items-start sm:items-center"
              >
                <div className="flex-1 mb-4 sm:mb-0">
                  <p className="text-sm text-gray-500 mb-1">
                    ID: {ped.id_pedido}
                  </p>
                  <p className="text-gray-800 mb-1">
                    Cliente: {ped.cliente_id}
                  </p>
                  <p className="text-gray-800 mb-1">
                    Fecha: {new Date(ped.fecha).toLocaleString()}
                  </p>
                  <p className="text-gray-800 mb-1">
                    Canal: {ped.canal_venta_id}
                  </p>
                  <p className="text-gray-800">
                    Estado: <span className="font-medium">{ped.estado}</span>
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleModify(ped.id_pedido)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full text-sm transition-colors"
                  >
                    Modificar
                  </button>
                  <button
                    onClick={() => handleDelete(ped.id_pedido)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-sm transition-colors"
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

export default Modificar;
