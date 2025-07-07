function Registrar() {
  return (
    <>
      <form>
        <label for="nombreCliente">Nombre del cliente:</label>
        <input type="text" id="nombreCliente" className="bg-blue-50"/>
        <input type="submit" value="Crear" className=" m-1.5 bg-cyan-100"/>
      </form>
    </>
  );
}

export default Registrar;
