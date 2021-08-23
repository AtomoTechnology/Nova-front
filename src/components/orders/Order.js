import moment from 'moment';
import React, { useState } from 'react';
import ReactPDF from '@react-pdf/renderer';
import { Loading } from '../Loading';
import { saveAs } from 'file-saver';
import axios from 'axios';
// import pdf1 from '../assets/img/pdf/1.png';
export const Order = ({ order }) => {
	const [loading, setLoading] = useState(false);
	const [downloaded, setDownloaded] = useState(false);
	if (order.work === null) {
		return <div>Orden no existe ....</div>;
	}
	const {
		work: { marca, cliente },
	} = order;

	const generatePdf = async (e) => {
		setLoading(true);
		axios
			.post(`${process.env.REACT_APP_URL}orders/${order?._id}`, {})
			.then(() =>
				axios.get(`${process.env.REACT_APP_URL}orders/fetchPdf/download`, {
					responseType: 'blob',
				})
			)
			.then((res) => {
				console.log(res);
				const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
				saveAs(pdfBlob, `${order.work?.codigo}.pdf`);
				setLoading(false);
			});
	};

	// if (loading) {
	//   return <Loading />;
	// }
	return (
		// <div
		// 	className={
		// 		'ordertransform p-2 duration-500 flex flex-row justify-between gap-x-3 align-center cursor-pointer  hover:shadow-3xl or' +
		// 		order._id
		// 	}
		// >
		// 	<h3>{order.work?.codigo}</h3>
		// 	<h3>{moment(order.createAt).format('DD MM YYYY')}</h3>
		// 	{/* <h3>{cliente}</h3> */}
		// 	<h3>{marca}</h3>
		// 	{loading ? (
		// 		<span>Descargando...</span>
		// 	) : (
		// 		<i
		// 			onClick={generatePdf}
		// 			className="fas fa-arrow-circle-down text-white text-center text-lg  bg-red-300 shadow-md rounded-full flex align-center justify-center w-7 h-7"
		// 		></i>
		// 	)}
		// </div>
		<div className="orden">
			<div className="photo">
				<img src="../assets/img/pdf/3.png" alt="" />
			</div>
			<div className="body-pdf">
				<h3 className="codigo">{order.work?.codigo}</h3>
				<h5 className="marca"> {order.work?.marca} </h5>
				<h5 className="modelo"> {order.work?.modelo} </h5>
				<button onClick={generatePdf} className="btn-download-pdf">
					{loading ? (
						<span>
							Descargando...
							{/* <i class="fas fa-spinner"></i> */}
						</span>
					) : (
						<span className="flex justify-between gap-x-3 align-center  ">
							<span>Descargar</span>
							<i className="fas fa-arrow-circle-down text-white text-center text-lg  bg-blue-600 shadow-md rounded-full flex align-center justify-center w-7 h-7"></i>
						</span>
					)}
				</button>
			</div>
		</div>
	);
};
