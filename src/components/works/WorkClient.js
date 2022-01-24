import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import userLogo from '../../templatePics/userLogo.png';
import { DeleteWork } from '../../action/worksAction';
import Swal from 'sweetalert2';
import moment from 'moment';

export const WorkClient = ({ work, history }) => {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth);
  let color = '';
  // console.log(history);
  switch (work.estado.name) {
    case 'Revision':
      color = 'red-700';
      break;
    case 'Presupuesto':
      color = 'gray-600';
      break;
    case 'En Reparacion':
      color = 'yellow-500';
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
    console.log(e.target.parentElement, e.target.parentElement.classList.toggle('active'));
  };

  return (
    <div className="work-client hover:bg-gray-100">
      <Link to={`/works/${work._id}`} className="title p-1">
        <span className={'capitalize text-' + color}>
          {work?.marca + ' - ' + work?.modelo}
          {work?.tieneContrasena && <i class="fas fa-lock work-lock"></i>}
        </span>
      </Link>
      <div className="observaciones p-1">
        <span>
          {work?.observaciones.slice(0, 60)} {work?.observaciones.length > 60 ? '...' : null}
        </span>
      </div>
      <div className="p-1">{work?.tieneContrasena ? work?.contrasena : null}</div>
      <div className="p-1">
        {' '}
        <p className="text-gray-300">{moment(work?.fechaInicio).format('DD-MM-yyyy')}</p>
      </div>
      {/* <div className="estado p-1 flex justify-between items-center">
        <span className={`rounded-sm text-white bg-${color} p-1`}>{work?.estado.name}</span>
        <i className={' fas fa-mobile-alt mr-4 text-' + color}></i>
      </div> */}
    </div>
  );
};
