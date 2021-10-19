import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert } from '../../helpers/Alert';
import { fetchWithToken } from '../../helpers/fetchWithOutToken';
import { useForm } from '../../hooks/useForm';
import { SmallLoading } from '../SmallLoading';
import { History } from './History';
import Swal from 'sweetalert2';
import { Gasto } from '../gastos/Gasto';

const Toast = Swal.mixin({
	toast: true,
	position: 'bottom-end',
	showConfirmButton: false,
	timer: 2500,
	timerProgressBar: true,
	didOpen: (toast) => {
		toast.addEventListener('mouseenter', Swal.stopTimer);
		toast.addEventListener('mouseleave', Swal.resumeTimer);
	},
});
const initialDate = moment(new Date()).format('YYYY-MM-DD');
export const Histories = () => {
	const [works, setWorks] = useState([]);
	const [startDate, setStartDate] = useState(initialDate);
	const [endDate, setEndDate] = useState(initialDate);
	const [searchWorks, setSearchWorks] = useState([]);
	const [loadingHistories, setLoadingHistories] = useState(true);
	const [gastos, setGastos] = useState([]);
	const [gastosFiltrados, setGastosFiltrados] = useState([]);

	const [values, handleInputChange, reset] = useForm({
		description: '',
		amount: 0,
	});
	const { description, amount } = values;

	useEffect(async () => {
		const resp = await fetchWithToken('works/historialWork/all');
		const works = await resp.json();
		if (works.ok) {
			setWorks(works.works);
		}
		setLoadingHistories(false);
	}, []);

	const handleEndtDate = (e) => {
		setEndDate(e.target.value);
	};
	const getOutgoings = async () => {
		const res = await fetchWithToken('outgoings');
		const body = await res.json();
		if (body.ok) {
			setGastos(body.gastos);
		}
	};
	useEffect(() => {
		getOutgoings();
	}, []);

	const handleStartDate = (e) => {
		setStartDate(e.target.value);
	};
	useEffect(() => {
		setSearchWorks(
			works.filter(
				(w) =>
					moment(moment(w.fechaFin).format('YYYY-MM-DD')).isSameOrAfter(
						startDate
					) &&
					moment(moment(w.fechaFin).format('YYYY-MM-DD')).isSameOrBefore(
						endDate
					)
			)
		);
		setGastosFiltrados(
			gastos.filter(
				(g) =>
					moment(moment(g.date).format('YYYY-MM-DD')).isSameOrAfter(
						startDate
					) &&
					moment(moment(g.date).format('YYYY-MM-DD')).isSameOrBefore(endDate)
			)
		);
	}, [startDate, endDate]);

	console.log(startDate, endDate);
	let total1 = 0;
	let total2 = 0;
	if (searchWorks.length > 0) {
		searchWorks.map((wk) => {
			total2 += wk.total;
		});
	}
	if (works && works.length > 0) {
		works.map((wk) => {
			total1 += wk.total;
		});
	}
	let gastostotal1 = 0;
	let gastostotal2 = 0;
	if (gastosFiltrados.length > 0) {
		gastosFiltrados.map((g) => {
			gastostotal2 += g.amount;
		});
	}
	if (gastos && gastos.length > 0) {
		gastos.map((g) => {
			gastostotal1 += g.amount;
		});
	}

	const clearEndDate = (e) => {
		setEndDate(initialDate);
	};
	const clearStartDate = (e) => {
		setStartDate(initialDate);
	};

	const openModalAddOutgoing = (e) => {
		document.querySelector('.add-outgoing-box').classList.toggle('active');
	};

	const agregarGasto = async (e) => {
		e.preventDefault();
		if (description != '' && amount != '' && description.length < 50) {
			const res = await fetchWithToken('outgoings', values, 'POST');
			const body = await res.json();
			if (body.ok) {
				Toast.fire({
					icon: 'success',
					title: body.msg,
				});
				reset();
				openModalAddOutgoing();
				getOutgoings();
			} else {
				Toast.fire({
					icon: 'error',
					title: body.msg,
				});
			}
		} else {
			console.log(description.length);
		}
	};

	const toggleGastos = () => {
		document.querySelector('.gastos').classList.toggle('active');
	};

	const toggleEntregados = () => {
		document.querySelector('.work-entregados').classList.toggle('active');
	};
	// console.log(total);
	return (
		<div>
			<div className="add-outgoing-box">
				<div
					className="add-outgoing-overlay"
					onClick={openModalAddOutgoing}
				></div>
				<div className="outgoing-content shadow">
					<div className="outgoing-header bg-green-700">
						<span>Agregar Gasto</span>
						<i
							onClick={openModalAddOutgoing}
							className="fas fa-times-circle"
						></i>
					</div>
					<div className="outgoing-body">
						<form onSubmit={agregarGasto}>
							<fieldset>
								<label htmlFor="description">Descripcion</label>
								<input
									type="text"
									name="description"
									onChange={handleInputChange}
									value={description}
								/>
							</fieldset>
							<fieldset>
								<label htmlFor="amount">Costo</label>
								<input
									type="number"
									name="amount"
									onChange={handleInputChange}
									value={amount}
								/>
							</fieldset>
							<fieldset className="outgoing-actions">
								<button className="shadow rounded bg-green-800" type="submit">
									Agregar
								</button>
								<button className="shadow rounded bg-gray-800" type="button">
									Cancelar
								</button>
							</fieldset>
						</form>
					</div>
				</div>
			</div>
			<span className="title-header">historiales Trabajos/Gastos</span>

			<div className="search search-histories p-3 mt-2  sticky bg-white">
				<h1 className="text-4xl text-green-500 mb-1  p-1 ">Filtrar</h1>
				<div className="flex box-input-filter mb-2 justify-between gap-1">
					<div className="flex-grow relative">
						<div className="start-day capitalize text-green-400 text-2xl">
							fecha Inicio
						</div>
						<div className="relative">
							<input
								className="text-gray-900 bg-gray-200 rounded-none cursor-pointer"
								type="Date"
								value={startDate}
								onChange={handleStartDate}
							/>
							<i
								onClick={clearStartDate}
								className="fas fa-times flex h-full items-center justify-center top-0  cursor-pointer ml-1 p-2 text-red-700 text-lg right-0 absolute"
							></i>
						</div>
					</div>

					<div className="flex-grow relative">
						<div className="end-day capitalize text-green-400 text-2xl">
							fecha Fin
						</div>
						<div className="relative">
							<input
								className="text-gray-900 bg-gray-200 rounded-none cursor-pointer"
								type="Date"
								value={endDate}
								onChange={handleEndtDate}
							/>
							<i
								onClick={clearEndDate}
								className="fas fa-times flex h-full items-center justify-center top-0  cursor-pointer ml-1 p-2 text-red-700 text-lg right-0 absolute"
							></i>
						</div>
					</div>
				</div>
			</div>

			{loadingHistories ? (
				<SmallLoading />
			) : searchWorks.length > 0 ? (
				<div className="">
					<div
						onClick={toggleEntregados}
						className="entregados-header gastos-header"
					>
						<span>Trab. Entregados</span>
						<i class="fas fa-angle-double-down"></i>
					</div>
					<table className="shadow-md work-entregados active">
						<thead className="bg-green-300 p-3">
							<tr>
								<th>Codigo</th>
								<th>Marca/Modelo</th>
								<th>Cliente</th>
								<th>Monto</th>
								<th>Fecha Entrega</th>
							</tr>
						</thead>
						<tbody>
							{searchWorks.map((w) => (
								<History key={w._id} work={w} />
							))}
						</tbody>
					</table>
					<div onClick={toggleGastos} className="gastos-header">
						<span>Gastos</span>
						<i class="fas fa-angle-double-down"></i>
					</div>

					<div className="gastos">
						{gastosFiltrados.map((gasto) => (
							<Gasto gasto={gasto} />
						))}
					</div>
					<div className="flex sticky bottom-0 justify-between p-2 bg-green-300 mt-1">
						<span>Ganancia : {' $ ' + total2} </span>
						<span>Gastos : {' $ ' + gastostotal2} </span>
						<span> Diferencias : {' $ ' + (total2 - gastostotal2)} </span>
					</div>
				</div>
			) : (
				<div className="">
					<div
						onClick={toggleEntregados}
						className="entregados-header gastos-header"
					>
						<span>Trab. Entregados</span>
						<i class="fas fa-angle-double-down"></i>
					</div>
					<table className="shadow-md work-entregados active">
						<thead className="bg-green-300 p-3">
							<tr>
								<th>Codigo</th>
								<th>Marca/Modelo</th>
								<th>Cliente</th>
								<th>Monto</th>
								<th>Fecha Entrega</th>
							</tr>
						</thead>
						<tbody>
							{works.map((w) => (
								<History key={w._id} work={w} />
							))}
						</tbody>
					</table>
					<div onClick={toggleGastos} className="gastos-header">
						<span>Gastos</span>
						<i class="fas fa-angle-double-down"></i>
					</div>
					<div className="gastos">
						{gastos.map((gasto) => (
							<Gasto gasto={gasto} />
						))}
					</div>
					<div className="flex sticky bottom-0 justify-between p-2 bg-green-300 mt-1">
						<span>Ganancia : {' $ ' + total1} </span>
						<span>Gastos : {' $ ' + gastostotal1} </span>
						<span> Diferencias : {' $ ' + (total1 - gastostotal1)} </span>
					</div>
				</div>
			)}
			<div
				onClick={openModalAddOutgoing}
				className="add-gastos-flotante cursor-pointer"
			>
				<div to="#">
					<i class="fas fa-plus-circle"></i>
					<span className="agregar-gasto">Agregar Gastos</span>
				</div>
			</div>
		</div>
	);
};
