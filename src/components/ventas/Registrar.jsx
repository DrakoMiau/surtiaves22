import { useState } from "react";

function Registrar() {
  const [nombre, setNombre] = useState(""); // guardamos el nombre
  const [fecha, setFecha] = useState("");
  const [valor, setValor] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault(); // es para evitar el comportamiento por default del navegador, asi no recarga la pagina cuando se ejecuta el submit

    try {
      const res = await fetch("http://localhost:3001/clientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre }),
      });

      const data = await res.json();
      console.log("Cliente creado:", data);

      setNombre(""); //
    } catch (error) {
      console.error("Error al crear cliente:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nombreCliente">Nombre del cliente:</label>
        <input
          type="text"
          id="nombreCliente"
          className="bg-blue-50"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <label htmlFor="fecha">Fecha</label>
        <input type="date" id="fecha" className="bg-blue-50" value={fecha} />
        <label htmlFor="">Valor</label>
        <input type="number" id="nombreProducto" className="bg-blue-50" value={valor} />
        <input type="submit" value="Crear" className="m-1.5 bg-cyan-100" />
      </form>
    </>
  );
}

export default Registrar;
