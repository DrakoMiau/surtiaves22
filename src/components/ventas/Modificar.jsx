
import { useState, useEffect } from 'react';

function Modificar() {
  const [pedidos, setPedidos] = useState([]);

  // 1. Cargar pedidos al montar
  useEffect(() => {
    fetch('http://localhost:3001/pedidos')
      .then(res => res.json())
      .then(data => setPedidos(data))
      .catch(err => console.error('Error fetching pedidos:', err));
  }, []);

  // 2. Eliminar un pedido
  const handleDelete = async (id) => {
    if (!confirm('¿Seguro que quieres eliminar este pedido?')) return;
    try {
      await fetch(`http://localhost:3001/pedidos/${id}`, { method: 'DELETE' });
      setPedidos(p => p.filter(ped => ped.id_pedido !== id));
    } catch (err) {
      console.error('Error eliminando:', err);
    }
  };

  // 3. Modificar estado de un pedido
  const handleModify = async (id) => {
    const nuevoEstado = prompt('Nuevo estado:');
    if (!nuevoEstado) return;
    try {
      await fetch(`http://localhost:3001/pedidos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: nuevoEstado })
      });
      setPedidos(p =>
        p.map(ped =>
          ped.id_pedido === id ? { ...ped, estado: nuevoEstado } : ped
        )
      );
    } catch (err) {
      console.error('Error modificando:', err);
    }
  };

  return (
    <div className="border border-black p-4">
      <h2 className="text-xl mb-4">Pedidos (Ventas)</h2>

      {/* 4. Mostrar registros */}
      <div className="space-y-2 mb-4">
        {pedidos.map(ped => (
          <div
            key={ped.id_pedido}
            className="p-2 border border-gray-300 rounded flex justify-between items-center"
          >
            <div>
              <p><strong>ID:</strong> {ped.id_pedido}</p>
              <p><strong>Cliente:</strong> {ped.cliente_id}</p>
              <p><strong>Fecha:</strong> {new Date(ped.fecha).toLocaleString()}</p>
              <p><strong>Canal:</strong> {ped.canal_venta_id}</p>
              <p><strong>Estado:</strong> {ped.estado}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleModify(ped.id_pedido)}
                className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded-full"
              >
                Modificar
              </button>
              <button
                onClick={() => handleDelete(ped.id_pedido)}
                className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded-full"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
        {pedidos.length === 0 && <p>No hay pedidos para mostrar.</p>}
      </div>
    </div>
  );
}

export default Modificar;

