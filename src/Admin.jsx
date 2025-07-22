import Registrar from "./components/ventas/Registrar";
import Modificar from "./components/ventas/Modificar";
import ModificarClientes from "./components/clientes/ModificarClientes";
import RegistrarClientes from "./components/clientes/RegistrarClientes";
import { useState } from "react";

function Admin() {
  const [vista, setVista] = useState("ver");
  const menuItems = [
    { key: "registrar", label: "Registrar Venta" },
    { key: "ver", label: "Ver Ventas" },
    { key: "verClientes", label: "Ver Clientes" },
    { key: "registrarClientes", label: "Registrar Clientes" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-rose-600 text-white">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li
                key={item.key}
                onClick={() => setVista(item.key)}
                className={`cursor-pointer p-2 rounded-md hover:bg-rose-700 transition-colors font-medium ${
                  vista === item.key ? "bg-rose-700" : ""
                }`}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold text-gray-800 capitalize">
            {menuItems.find((m) => m.key === vista)?.label}
          </h1>
          <p className="text-gray-600">Bienvenido, administrador.</p>
        </header>

        <div className="bg-white p-6 rounded-lg shadow-md h-full">
          {vista === "registrar" && <Registrar />}
          {vista === "ver" && <Modificar />}
          {vista === "verClientes" && <ModificarClientes />}
          {vista === "registrarClientes" && <RegistrarClientes />}
        </div>
      </main>
    </div>
  );
}

export default Admin;
