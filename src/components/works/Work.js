import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import workFakeFoto from '../../templatePics/bg.jpg';
import userLogo from '../../templatePics/userLogo.png';
import { DeleteWork } from '../../action/worksAction';
import Swal from 'sweetalert2';

export const Work = ({ work, idChange, setIdChange }) => {
	const dispatch = useDispatch();

	console.log(idChange);

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
				setIdChange(work?._id);
				console.log(idChange);
			}
		});
	};

	return (
		<div className="work">
			<ul className="action-work">
				{/* <li>
					<a href={'work/edit/' + work._id}>
						<span>Editar</span>
						<i class="fas fa-trash"></i>
					</a>
				</li>
				<li>
					<span>Terminado</span>
					<i class="fas fa-trash"></i>
				</li>
				<li>
					<span>Entregado</span>
					<i class="fas fa-trash"></i>
				</li> */}
				<li onClick={DeleteWorkById}>
					<span>Borrar</span>
					<i class="fas fa-trash"></i>
				</li>
			</ul>
			{/* <i  class="fas fa-trash borrar-trabajo"></i> */}
			{/* {work?.images.length > 0 ? (
				work?.images[0].url ? (
					<img
						style={{
							height: 150,
						}}
						className="rounded-t"
						src={work?.images[1].url}
					/>
				) : (
					<img
						style={{
							height: 150,
						}}
						className="rounded-t"
						src={`/assets/img/works/${work?.images[0]?.fileName}`}
					/>
				)
			) : (
				<img
					style={{
						height: 150,
					}}
					className="rounded-t"
					src={workFakeFoto}
				/>
			)} */}
			<div className="cliente-precio flex justify-between bg-gray-200 rounded-b p-1 items-center gap-2">
				{work?.cliente?.pathImg ? (
					<img
						className="rounded-full w-8 border-1 border-pink-500 h-8"
						src={`/assets/img/client/${work?.cliente?.pathImg}`}
					/>
				) : (
					<img
						className="rounded-full w-8 border-1 border-pink-500 h-8"
						src={userLogo}
					/>
				)}

				<h3 className="capitalize font-serif">
					{work?.cliente?.name?.slice(0, 10)}...
				</h3>
				{role == 'admin' && (
					// <span className={'work-precio text-' + color}>
					// 	{'$' + work?.total.toFixed(2)}
					// </span>
					<i class="fas fa-ellipsis-v"></i>
				)}
			</div>
			<Link to={`/works/${work._id}`} className="title p-1">
				<span className={'capitalize text-' + color}>
					{work?.marca + ' - ' + work?.modelo}
					{work?.tieneContrasena && <i class="fas fa-lock work-lock"></i>}
				</span>
			</Link>
			<div className="observaciones p-1">
				<span>
					{work?.observaciones.slice(0, 60)}{' '}
					{work?.observaciones.length > 60 ? '...' : null}
				</span>
			</div>
			<div className="p-1">
				{work?.tieneContrasena ? work?.contrasena : null}
			</div>
			{/* <div className="p-1">
				{' '}
				<p className="text-gray-300">
					{moment(work?.fechaInicio).format('DD-MM-yyyy')}
				</p>
			</div> */}
			<div className="estado p-1 flex justify-between items-center">
				<span className={`rounded-sm text-white bg-${color} p-1`}>
					{work?.estado.name}
				</span>
				<i className={' fas fa-mobile-alt mr-4 text-' + color}></i>
			</div>
		</div>
	);
};
