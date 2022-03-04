const News = () => {
  return (
    <div className="news  bg-gray-100">
      <div className="news-container">
        <h1 className="text-3xl text-green-800">Historial de cambios </h1>
        <section className="news-section shadow-md">
          <h4 className="fecha-update bg-green-600 text-white p-1">14/12/2021 - 00:30</h4>
          <ul className="py-3 news-list">
            <li>Poder borrar un trabajo</li>
            <li>Cambiar los campos de tipo number en textos (Precio , Descuento , Recargo)</li>
            <li>Sacar la imagen en trabajo y poner la contraseña en vez del codigo </li>
            <li>Al borrar un trabajo borrar sus estados tambien</li>
            <li>Poder borrar un gasto </li>
            <li>Acomodar los gastos iguales que los trabajos Entregados </li>
          </ul>
        </section>
      </div>
    </div>
  );
};
export default News;
