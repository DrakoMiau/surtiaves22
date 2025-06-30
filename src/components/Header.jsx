import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-amber-300">
      <div className="text-center text-xl">
        <h1>Surtiaves22</h1>
      </div>
      <nav className="flex justify-end">
        <ul className="flex gap-4">
          <li>
            <Link to='/'>Inicio</Link>
          </li>
          <li>
            <a href="">Menu</a>
          </li>
          <li>
            <a href="">Contacto</a>
          </li>
          <li>
            <a href="">Pide</a>
          </li>
          <li>
            <Link to="/usuarios">Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default Header;
