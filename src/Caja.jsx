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
              Registrar venta
            </li>
            <li onClick={() => setVista("ver")}>Ver ventas</li>
          </ul>
        </nav>
        <section className="flex-1 p-6 bg-gray-500">
          {/*Aqui se tiene que mostrar el historico de ventas o el formulario de creacion de facturas*/}
          {/*Recordar poner como estado inicial el nombre del cajer@ y su bienvenida*/}
          {vista === "registrar" && <p>Registro</p>}
          {vista === "ver" && (
            <div>
              <form>
                <button className="btn bg-blue-500 rounded-full hover:bg-blue-700 text-white py-2 px-4 font-bold">
                  Modificar
                </button>
                <button className="btn bg-red-500 rounded-full hover:bg-red-800 text-white py-2 px-4 font-bold">
                  Eliminar
                </button>
              </form>
            </div>
          )}
        </section>
      </div>
    </>
  );
}

export default Caja;
