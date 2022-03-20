import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

export const WorkClient = ({ work }) => {
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
    case 'Entregado':
      color = 'green-700';
      break;
    default:
      color = '';
      break;
  }

  // const toogleHeaderAction = (e) => {
  //   const all = document.querySelectorAll('.header-action');
  //   all.forEach((el) => {
  //     if (el !== e.target.parentElement) el.classList.remove('active');
  //   });
  // };

  return (
    <div className={'work-client hover:bg-gray-100 !bg-' + color}>
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
      <div className="p-1">
        {' '}
        <p className="text-gray-300">{moment(work?.fechaInicio).format('DD-MM-yyyy')}</p>
      </div>
      <div className="estado p-1 flex justify-between items-center">
        <span className={`rounded-sm text-white bg-${color} p-1`}>{work?.estado.name}</span>
        <i className={' fas fa-mobile-alt mr-4 !text-' + color}></i>
      </div>
    </div>
  );
};
