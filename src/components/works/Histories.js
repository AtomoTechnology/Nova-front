import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { fetchWithToken } from '../../helpers/fetchWithOutToken';
import { SmallLoading } from '../SmallLoading';
import { History } from './History';
const initialDate = moment(new Date()).format('YYYY-MM-DD');
export const Histories = () => {
	const [works, setWorks] = useState([]);
	const [startDate, setStartDate] = useState(initialDate);
	const [endDate, setEndDate] = useState(initialDate);
	const [searchWorks, setSearchWorks] = useState([]);
	const [loadingHistories, setLoadingHistories] = useState(true);

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
	}, [startDate, endDate]);

	console.log(startDate, endDate);
	let total1 = 0;
	let total2 = 0;
	if (searchWorks.length > 0) {
		searchWorks.map((wk) => {
			total2 += wk.precio;
		});
	}
	if (works && works.length > 0) {
		works.map((wk) => {
			total1 += wk.precio;
		});
	}
	const clearEndDate = (e) => {
		setEndDate(initialDate);
	};
	const clearStartDate = (e) => {
		setStartDate(initialDate);
	};
	// console.log(total);
	return (
		<div>
			<div className="search search-histories  shadow rounded">
				<h1 className="text-4xl text-green-500 mb-1 bg-gray-200 p-1 ">
					Filtrar
				</h1>
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
					<table className="shadow-md" width="100%">
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
					<div className="flex justify-between p-2 bg-green-300 mt-1">
						<span>Precio Total </span>
						<span> {' $ ' + total1} </span>
					</div>
				</div>
			) : (
				<div className="">
					<table className="shadow-md" width="100%">
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
					<div className="flex justify-between p-2 bg-green-300 mt-1">
						<span>Precio Total </span>
						<span> {' $ ' + total1} </span>
					</div>
				</div>
			)}
		</div>
	);
};
