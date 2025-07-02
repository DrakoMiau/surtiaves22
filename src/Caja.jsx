import { useState } from "react";
function Caja() {
  // Las funcionalidades que debe tener caja son de registrar venta
  // leer las ventas registradas
  // modificar las ventas, basicamente el crud completo sobre ventas

  const [vista, setVista] = useState("ver");
  return (
    <>
      <div className="flex h-screen">
        <nav className="w-64 bg-blue-400 p-6">
          <ul className="bg-blue-400 p-20 flex flex-col justify-items-start pl-0">
            <li
              className="border-amber-500 border-solid border-1"
              onClick={() => setVista("registrar")}
            >
              Registrar pedido
            </li>
            <li onClick={() => setVista("ver")}>Ver pedidos</li>
          </ul>
        </nav>
        <section className="flex-1 p-6 bg-gray-500">
          {/*Aqui se tiene que mostrar el historico de ventas o el formulario de creacion de facturas*/}
          {vista === "registrar" && <p>Registro</p>}
          {vista === "ver" && <p>Historico</p>}
        </section>
      </div>
    </>
  );
}

export default Caja;
