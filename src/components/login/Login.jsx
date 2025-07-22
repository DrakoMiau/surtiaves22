import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {
  const { rol } = useParams(); // 'admin', 'caja', etc.
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
      const res = await axios.post("http://localhost:3001/login", {
        nombre_usuario: nombreUsuario,
        contrasena,
        rol,
      });

      if (res.status === 200 && res.data.success) {
        // Ahora redirigimos a las rutas existentes:
        if (rol === "admin") navigate("/admin");
        else if (rol === "caja") navigate("/caja");
        else navigate("/");
      }
    } catch (err) {
      console.error("Error en login:", err);
      const msg =
        err.response?.data?.error ||
        "Error de autenticación. Revisa tus credenciales.";
      setError(msg);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded">
      <h2 className="text-2xl mb-4 capitalize">Login — {rol}</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <div className="space-y-4">
        <div>
          <label className="block mb-1">Usuario</label>
          <input
            type="text"
            className="w-full p-2 border"
            value={nombreUsuario}
            onChange={(e) => setNombreUsuario(e.target.value)}
            placeholder="Nombre de usuario"
          />
        </div>
        <div>
          <label className="block mb-1">Contraseña</label>
          <input
            type="password"
            className="w-full p-2 border"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            placeholder="Contraseña"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
        >
          Iniciar sesión
        </button>
      </div>
    </div>
  );
}

export default Login;
