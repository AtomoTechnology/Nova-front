import React from 'react';
import moment from 'moment';
import { fetchWithToken } from '../../helpers/fetchWithOutToken';
import Swal from 'sweetalert2';
const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 4000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

export const Gasto = ({ gasto, setOutGoingChange, outGoingChange }) => {
  // console.log(outGoingChange);

  const deleteOutgoing = async () => {
    const res = await fetchWithToken(`outgoings/${gasto._id}`, [], 'DELETE');
    const body = await res.json();
    // console.log(body);
    if (body.status === 'success') {
      setOutGoingChange(!outGoingChange);
      Toast.fire({
        icon: 'success',
        title: 'Gasto borrado con exito',
      });
    }
  };

  const confirmDelete = () => {
    Swal.fire({
      title: 'Estás seguro ?',
      text: 'Al aceptar se borrará el gasto definitivamente!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteOutgoing();
      }
    });
  };

  return (
    // <div className="gasto">
    // 	<i className="fas fa-dollar-sign"></i>
    // 	<div className="gasto-content">
    // 		<h5>{gasto.description} </h5>
    // 		<div className="amout-date">
    // 			<span className="amount"> - ${gasto.amount}</span>
    // 			<span className="date">
    // 				{moment(gasto?.date).format('DD-MM-yyyy')}
    // 			</span>
    // 		</div>
    // 	</div>
    // </div>

    <tr className="history p-2 bg-gray-200 hover:bg-gray-300 duration-300 shadow cursor-pointer">
      <td className="">{moment(gasto?.date).format('DD-MM-yyyy')}</td>
      <td className="flex-1 p-2">{gasto.description}</td>
      <td className="flex-1 p-2 text-red-600">- $ {gasto.amount} </td>
      <td className="flex-1 p-2 text-red-600">
        <i
          onClick={confirmDelete}
          className="fas fa-trash p-2 shadow  rounded-full text-white bg-red-800 hover:shadow-md hover:bg-red-600 hover:p-3"
        ></i>
      </td>
    </tr>
  );
};
