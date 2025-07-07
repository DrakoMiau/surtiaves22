function Modificar() {
  return (
    <>
      <div className="border-black border-solid border-1 h-full">
        <form className="border-amber-100 border-solid border-1">
          <div>
            {/* en este div tengo que mostrar el contenido de los registros de sql*/}
          </div>
          <div className="flex justify-end">
            <button className="btn bg-blue-500 rounded-full hover:bg-blue-700 text-white py-2 px-4 font-bold">
              Modificar
            </button>
            <button className="btn bg-red-500 rounded-full hover:bg-red-800 text-white py-2 px-4 font-bold">
              Eliminar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Modificar;
