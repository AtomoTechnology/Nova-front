import error4040 from './../templatePics/error-404.png';

export const ErrorApp = () => {
  return (
    <div className="flex flex-col p-4  justify-center items-center gap-4 h-screen ">
      {/* 
      <span className="text-6xl text-red-500 p-3 m-3">Error 400</span> 
      */}
      <img src={error4040} width="300" />
      <h1 className="text-lg ">Esta Pagina no existe 😒</h1>
      <a href="/" className="btn bg-red-500 jhm-shadow text-white">
        {' '}
        Volver al Inicio{' '}
      </a>
    </div>
  );
};
