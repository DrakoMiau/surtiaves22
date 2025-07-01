import { Link } from "react-router-dom";

function Usuarios() {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="flex justify-end"></div>
        <ul className="flex gap-4">
          <li><Link to='/caja'>Caja</Link></li>
          <li><Link to='/mesa'>Mesa</Link></li>
          <li><Link to='/admin'>Admin</Link></li>
          <li><Link to='/cocina'>Cocina</Link></li>
          <li><Link to='/domiciliario'>Domiciliario</Link></li>
        </ul>
      </div>
    </>
  );
}
export default Usuarios;
