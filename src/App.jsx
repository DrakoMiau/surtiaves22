import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Usuarios from "./Usuarios";
import Inicio from "./Inicio";
import Mesa from "./Mesa";
import Caja from "./Caja";
import Admin from "./Admin";
import Domiciliario from "./Domiciliario";
import Cocina from "./Cocina";
import Login from "./components/login/Login";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/mesa" element={<Mesa />} />
        <Route path="/caja" element={<Caja />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/domiciliario" element={<Domiciliario />} />
        <Route path="/cocina" element={<Cocina />} />
        <Route path="/login/:rol" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
