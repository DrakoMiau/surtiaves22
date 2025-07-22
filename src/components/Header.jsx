import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-gradient-to-r from-amber-500 to-yellow-400 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <span className="text-3xl text-rose-600">🐔</span>
          <h1 className="text-2xl font-extrabold text-rose-700">Surtiaves22</h1>
        </div>

        {/* Navigation */}
        <nav>
          <ul className="flex space-x-6 font-medium">
            <li>
              <Link to="/" className="hover:text-rose-600 transition-colors">
                Inicio
              </Link>
            </li>
            <li>
              <a href="#menu" className="hover:text-rose-600 transition-colors">
                Menu
              </a>
            </li>
            <li>
              <a
                href="#contacto"
                className="hover:text-rose-600 transition-colors"
              >
                Contacto
              </a>
            </li>
            <li>
              <a href="#pide" className="hover:text-rose-600 transition-colors">
                Pide
              </a>
            </li>
            <li>
              <Link
                to="/usuarios"
                className="bg-rose-600 text-white py-1 px-3 rounded-full hover:bg-rose-700 transition-colors"
              >
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
export default Header;
