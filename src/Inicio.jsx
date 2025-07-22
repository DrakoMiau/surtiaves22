import React from "react";

function Inicio() {
  const platos = [
    {
      nombre: "Pollo a la brasa",
      emoji: "🍗",
      descripcion: "Pollo marinado y asado al carbón servido con papas fritas.",
    },
    {
      nombre: "Brochetas de pollo",
      emoji: "🥙",
      descripcion: "Tiernos trozos de pollo ensartados con verduras.",
    },
    {
      nombre: "Ensalada de pollo",
      emoji: "🥗",
      descripcion: "Fresca ensalada con pechuga de pollo a la plancha.",
    },
    {
      nombre: "Wrap de pollo",
      emoji: "🌯",
      descripcion: "Tortilla rellena de pollo, queso y vegetales.",
    },
  ];

  return (
    <div className="bg-yellow-50 min-h-screen p-8 space-y-16">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h1 className="text-4xl font-extrabold text-rose-600">
          🐔 Bienvenidos a Surtiaves22
        </h1>
        <p className="text-lg text-gray-700">
          Disfruta de nuestros deliciosos platos a base de pollo, preparados con
          ingredientes frescos.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {platos.map((plato) => (
          <div
            key={plato.nombre}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <div className="text-5xl mb-4">{plato.emoji}</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {plato.nombre}
            </h2>
            <p className="text-gray-600">{plato.descripcion}</p>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-2xl font-semibold text-rose-600">
          Nuestra Historia
        </h2>
        <p className="text-gray-700">
          Desde 2010, Surtiaves22 nace con la pasión de compartir el auténtico
          sabor del pollo a la brasa. Con raíces familiares, comenzamos en un
          pequeño local y hoy somos reconocidos por nuestra calidad y tradición.
        </p>

        <h2 className="text-2xl font-semibold text-rose-600">
          Nuestra Atención
        </h2>
        <p className="text-gray-700">
          Nos enorgullece brindar un servicio cercano y cálido. Cada cliente es
          parte de nuestra familia, por lo que nos esforzamos en ofrecer
          experiencias únicas y memorables en cada visita.
        </p>

        <h2 className="text-2xl font-semibold text-rose-600">Nuestra Misión</h2>
        <p className="text-gray-700">
          Nuestra misión es llevar sonrisas a través de platos deliciosos,
          manteniendo los más altos estándares de calidad y frescura. Queremos
          ser tu primera opción cuando piensas en pollo bien preparado.
        </p>
      </div>
    </div>
  );
}

export default Inicio;
