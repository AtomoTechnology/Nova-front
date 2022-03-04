import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import userLogo from '../../templatePics/userLogo.png';
import { DeleteWork } from '../../action/worksAction';
import Swal from 'sweetalert2';

export const Work = ({ work, history }) => {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth);
  let color = '';
  switch (work.estado.name) {
    case 'Revision':
      color = 'red-700';
      break;
    case 'Presupuesto':
      color = 'gray-600';
      break;
    case 'En Reparacion':
      color = 'yellow-600';
      break;
    case 'Terminado':
      color = 'pink-400';
      break;
    default:
      color = 'green-700';
      break;
  }

  const DeleteWorkById = () => {
    Swal.fire({
      title: 'Estás seguro ?',
      text: 'Al aceptar se borrará el trabajo definitivamente!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(DeleteWork(work?._id));
        history.push('/works');
      }
    });
  };

  const toogleHeaderAction = (e) => {
    const all = document.querySelectorAll('.header-action');
    all.forEach((el) => {
      if (el !== e.target.parentElement) el.classList.remove('active');
    });
  };

  return (
    <div className="work ">
      <div className="cliente-precio flex justify-between bg-gray-100  p-1 items-center">
        {work?.cliente?.pathImg ? (
          <img
            className="rounded-full w-8 border-1 border-pink-500 h-8"
            src={`/assets/img/client/${work?.cliente?.pathImg}`}
          />
        ) : (
          <img className="rounded-full w-8 border-1 border-pink-500 h-8" src={userLogo} />
        )}

        <h3 className="capitalize font-serif">{work?.cliente?.name}</h3>
        {role == 'admin' && (
          <div className="header-action  relative">
            <i
              onClick={toogleHeaderAction}
              className="fas fa-ellipsis-v rounded cursor-pointer w-8 h-8 shadow bg-gray-100  flex justify-center items-center hover:shadow-md hover:rounded-full hover:bg-blue-100"
            ></i>
            <div className="hidden absolute flex justify-center gap-2 items-center right-0 p-1 bg-gray-100  shadow  ">
              <span className="w-8 h-8 rounded-full cursor-pointer hover:shadow-md hover:text-red-500  text-red-700  shadow p-1 flex justify-center items-center text-center bg-white">
                <i className="fas fa-trash " onClick={DeleteWorkById}></i>
              </span>
            </div>
          </div>
        )}
      </div>
      <Link to={`/works/${work._id}`} className="title p-1">
        <span className={'capitalize text-' + color}>
          {work?.marca + ' - ' + work?.modelo}
          {work?.tieneContrasena && <i className="fas fa-lock work-lock"></i>}
        </span>
      </Link>
      <div className="observaciones p-1">
        <span>
          {work?.observaciones.slice(0, 60)} {work?.observaciones.length > 60 ? '...' : null}
        </span>
      </div>
      <div className="p-1">{work?.tieneContrasena ? work?.contrasena : null}</div>
      {/* <div className="p-1">
        {' '}
        <p className="text-gray-300">{moment(work?.fechaInicio).format('DD-MM-yyyy HH:mm:ss')}</p>
      </div> */}
      <div className="estado p-1 flex justify-between items-center">
        <span className={`rounded-sm text-white bg-${color} p-1`}>{work?.estado.name}</span>
        <i className={' fas fa-mobile-alt mr-4 text-' + color}></i>
      </div>
    </div>
  );
};
