import { useState } from "react";
import RegistrarMesa from "./components/pedidosMesa/ResgistrarMesa";
import VerPedidosMesa from "./components/pedidosMesa/VerPedidosMesa";
function Mesa() {
  // mesa deberia poder tener el crud completo pero solo para la vista que corresponde a sus propios pedidos a mesa
  // considerar que los pedidos entonces deben tener una categoria, ya sea domicilio o mesa.
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
          {/*Recordar poner como estado inicial el nombre del cajer@ y su bienvenida*/}
          {vista === "registrar" && <RegistrarMesa />}
          {vista === "ver" && <VerPedidosMesa />}
        </section>
      </div>
    </>
  );
}

export default Mesa;
