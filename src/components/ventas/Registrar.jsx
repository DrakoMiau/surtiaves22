
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
      // Crear cliente
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

      // Crear pedido
      const pedidoRes = await fetch("http://localhost:3001/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cliente_id: clienteId,
          canal_venta_id: canalVenta,
          estado,
        }),
      });

      const pedidoData = await pedidoRes.json();
      console.log("Pedido creado:", pedidoData);

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
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
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
      <div>
        <label>Canal de venta:</label>
        <select
          className="bg-blue-50 w-full p-1"
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
        <label>Estado:</label>
        <select
          className="bg-blue-50 w-full p-1"
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
      <button
        type="submit"
        className="bg-cyan-100 py-2 px-4 rounded hover:bg-cyan-200"
      >
        Registrar pedido
      </button>
    </form>
  );
}

export default Registrar;


