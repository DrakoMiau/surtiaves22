import Registrar from "./components/ventas/Registrar";
import Modificar from "./components/ventas/Modificar";
import ModificarClientes from "./components/clientes/ModificarClientes"
import { useState } from "react";

function Admin() {
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
              Registrar venta
            </li>
            <li onClick={() => setVista("ver")}>Ver ventas</li>
            <li onClick={() => setVista("verClientes")}>Ver clientes</li>
          </ul>
        </nav>
        <section className="flex-1 p-6 bg-gray-500">
          {/*Aqui se tiene que mostrar el historico de ventas o el formulario de creacion de facturas*/}
          {/*Recordar poner como estado inicial el nombre del cajer@ y su bienvenida*/}
          {vista === "registrar" && <Registrar />}
          {vista === "ver" && <Modificar />}
          {vista === "verClientes" && <ModificarClientes />}
        </section>
      </div>
    </>
  );
}

export default Admin;
