import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useSelector } from 'react-redux';
import workFakeFoto from '../../templatePics/bg.jpg';
import userLogo from '../../templatePics/userLogo.png';

export const Work = ({ work }) => {
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
	return (
		<Link to={`/works/${work._id}`} className="work">
			{work?.images.length > 0 ? (
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
			)}

			<div className="title p-1">
				<span className={'capitalize text-' + color}>
					{work?.marca + ' - ' + work?.modelo}
					{work?.tieneContrasena && <i class="fas fa-lock work-lock"></i>}
				</span>
			</div>
			<div className="observaciones p-1">
				<span>
					{work?.observaciones.slice(0, 100)}{' '}
					{work?.observaciones.length > 100 ? '...' : null}
				</span>
			</div>
			<div className="p-1">
				{' '}
				<p className="text-gray-700">{work?.codigo}</p>
			</div>
			<div className="p-1">
				{' '}
				<p className="text-gray-300">
					{moment(work?.fechaInicio).format('DD-MM-yyyy')}
				</p>
			</div>
			<div className="estado p-1 flex justify-between items-center">
				<span className={`rounded-sm text-white bg-${color} p-1`}>
					{work?.estado.name}
				</span>
				<i className={' fas fa-mobile-alt mr-4 text-' + color}></i>
			</div>
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
					<span className={'work-precio text-' + color}>
						{'$' + work?.total.toFixed(2)}
					</span>
				)}
			</div>
		</Link>
	);
};
