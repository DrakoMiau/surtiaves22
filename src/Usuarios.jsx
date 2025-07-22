import { Link } from "react-router-dom";

function Usuarios() {
  const opciones = [
    { label: 'Caja', ruta: '/login/caja' },
    { label: 'Mesa', ruta: '/login/mesa' },
    { label: 'Admin', ruta: '/login/admin' },
    { label: 'Cocina', ruta: '/login/cocina' },
    { label: 'Domiciliario', ruta: '/login/domiciliario' },
  ];

  return (
    <div className="bg-yellow-50 min-h-screen flex flex-col justify-center items-center p-6">
      <h2 className="text-3xl font-extrabold text-rose-600 mb-8">
        Selecciona tu Rol
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {opciones.map((opt) => (
          <Link
            key={opt.ruta}
            to={opt.ruta}
            className="flex flex-col items-center justify-center bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow transform hover:-translate-y-1"
          >
            <span className="text-6xl mb-4">🐔</span>
            <span className="text-xl font-semibold text-gray-800">{opt.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Usuarios;

