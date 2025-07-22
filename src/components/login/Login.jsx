import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const { rol } = useParams();
  const navigate = useNavigate();

  const [nombreUsuario, setNombreUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!nombreUsuario || !contrasena) {
      setError("Por favor completa ambos campos.");
      return;
    }
    setError("");

    try {
      const res = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre_usuario: nombreUsuario,
          contrasena,
          rol,
        }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        if (rol === "admin") navigate("/admin");
        else if (rol === "caja") navigate("/caja");
        else navigate("/");
      } else {
        setError(data.error || "Credenciales inválidas.");
      }
    } catch (err) {
      console.error("Error en login:", err);
      setError("Error de red, intenta nuevamente.");
    }
  };

  return (
    <div className="bg-yellow-50 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white max-w-md w-full p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-extrabold text-rose-600 text-center mb-6 capitalize">
          🐔 Iniciar sesión - {rol}
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1">Usuario</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
              value={nombreUsuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
              placeholder="Nombre de usuario"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Contraseña</label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              placeholder="Contraseña"
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-full bg-rose-600 text-white py-3 rounded-full hover:bg-rose-700 transition-colors"
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
