export const SmallLoading = ({ text = 'Cargando...', size = 'big' }) => {
  return (
    <div className={`spinner spinner-` + size}>
      <div className="bounce1"></div>
      <div className="bounce2"></div>
      <div className="bounce3"></div>
      <span>{text}</span>
    </div>
  );
};
