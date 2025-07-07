import { useState } from "react";

function Registrar() {
  const [nombre, setNombre] = useState(""); // Guarda el valor del input

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita recargar la página

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

      setNombre(""); // Limpia el input
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
        <input type="submit" value="Crear" className="m-1.5 bg-cyan-100" />
      </form>
    </>
  );
}

export default Registrar;
