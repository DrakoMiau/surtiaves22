import { useState } from "react";
function Cocina(){
  const [vista, setVista] = useState('aceptar')
  return(

    <>
      <div className="flex h-screen">
        <nav className="w-64 bg-blue-400 p-6">
          <ul className="bg-blue-400 p-20 flex flex-col justify-items-start pl-0">
            <li
              className="border-amber-500 border-solid border-1"
              onClick={() => setVista("aceptar")}
            >
              Tomar pedidos
            </li>
            <li onClick={() => setVista("modificar")}>Modificar pedido</li>
          </ul>
        </nav>
        <section className="flex-1 p-6 bg-gray-500">
          {/*Aqui se tiene que mostrar el historico de ventas o el formulario de creacion de facturas*/}
          {/*Recordar poner como estado inicial el nombre del cajer@ y su bienvenida*/}
          {vista === "aceptar" && <p>Lista de pedidos disponibles</p>}
          {vista === "modificar" && <p>Historico</p>}
        </section>
      </div>
    </>
  );
}

export default Cocina;
