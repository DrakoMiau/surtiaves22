import { useState } from "react";

function Registrar() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [correo, setCorreo] = useState("");

  const [estado, setEstado] = useState("Pendiente");
  const [canalVenta, setCanalVenta] = useState(1);

  const canales = [
    { id_canal: 1, nombre: "Tienda física" },
    { id_canal: 2, nombre: "Página web" },
    { id_canal: 3, nombre: "Llamada telefónica" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const clienteRes = await fetch("http://localhost:3001/clientes", {
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
      const clienteData = await clienteRes.json();
      const clienteId = clienteData.id;

      await fetch("http://localhost:3001/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cliente_id: clienteId,
          canal_venta_id: canalVenta,
          estado,
        }),
      });

      // Limpiar formulario
      setNombre("");
      setApellido("");
      setTelefono("");
      setDireccion("");
      setCorreo("");
      setEstado("Pendiente");
      setCanalVenta(1);
    } catch (error) {
      console.error("Error al registrar pedido:", error);
    }
  };

  return (
    <div className="bg-yellow-50 p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-rose-600 mb-4">Registrar Pedido</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
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
          <div className="sm:col-span-2">
            <label className="block text-gray-700 mb-1">Correo</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Canal de Venta</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
              value={canalVenta}
              onChange={(e) => setCanalVenta(parseInt(e.target.value))}
              required
            >
              {canales.map((canal) => (
                <option key={canal.id_canal} value={canal.id_canal}>
                  {canal.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Estado</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              required
            >
              <option value="Pendiente">Pendiente</option>
              <option value="En proceso">En proceso</option>
              <option value="Entregado">Entregado</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-rose-600 text-white py-3 rounded-full hover:bg-rose-700 transition-colors"
        >
          Registrar Pedido
        </button>
      </form>
    </div>
  );
}

export default Registrar;


