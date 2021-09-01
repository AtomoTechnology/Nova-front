import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { createWork } from '../../action/worksAction';
import { useForm } from '../../hooks/useForm';
import { startGettingAllClient } from '../../action/clientsAction';
import { showMultiplesImg } from '../../helpers/CodeShowImg';

export const AddWork = ({ history }) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(startGettingAllClient());
	}, [dispatch]);

	const { clients } = useSelector((state) => state.clients);
	const [errores, setErrores] = useState([]);
	const [patronError, setPatronError] = useState(false);
	const [checkPassword, setCheckPassword] = useState(false);
	const [checkPatron, setCheckPatron] = useState(false);
	const [tiene_Contrasena, setTieneContrasena] = useState(false);
	const [es_patron, setEs_patron] = useState(false);
	const [passwordPatron, setContraseña] = useState('');

	const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	const [numberImages, setNumberImages] = useState(0);
	const [files, setFiles] = useState(null);
	const [estados, setEstados] = useState([]);
	const [loading, setLoading] = useState(false);
	const [oneClientForm, setOneClientForm] = useState(null);
	const [linkImages, setLinkImages] = useState(null);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_URL}state`)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setEstados(data.states);
			});
	}, [setEstados]);
	const [values, handleInputChange, reset] = useForm({
		marca: '',
		modelo: '',
		emei: '',
		estado: '',
		precio: 0,
		descuento: 0,
		fachasEncontradas: '',
		observaciones: '',
		descripcion: '',
		recargo: 0,
		cliente: '',
		fechaInicio: moment().format('yyyy MM DD'),
		fechaFin: null,
		tieneContrasena: tiene_Contrasena,
		esPatron: es_patron,
		contrasena: '',
		patron: '',
	});

	console.log(oneClientForm);
	const {
		marca,
		modelo,
		emei,
		estado,
		precio,
		descuento,
		fachasEncontradas,
		descripcion,
		observaciones,
		recargo,
		cliente,
		esPatron,
		tieneContrasena,
		contrasena,
		patron,
	} = values;

	const changeCheckPassword = (e) => {
		if (e.target.checked) {
			setCheckPassword(true);
			values.tieneContrasena = true;
		} else {
			setCheckPassword(false);
			values.tieneContrasena = false;
			values.contrasena = '';
			// setPasswordRequired(false);
		}
	};
	const changeCheckPatron = (e) => {
		if (e.target.checked) {
			setCheckPatron(true);
			values.esPatron = true;
			values.contrasena = '';
			document.querySelector('#input-password').classList.add('hidden');
		} else {
			values.contrasena = '';
			values.patron = '';
			setContraseña('');
			setCheckPatron(false);
			values.esPatron = false;
			document.querySelector('#input-password').classList.remove('hidden');
		}
	};

	const handleSubmitLogin = (e) => {
		e.preventDefault();
		setLoading(true);
		if (verifyForm()) {
			console.log(values);
			dispatch(createWork(values, linkImages));
			reset();
			setTimeout(() => {
				window.location.href = '/works';
			}, 1000);
			// history.push('/works');
		} else {
			console.log(errores);
			console.log(values);
		}
		setLoading(false);
	};
	// varify the form values
	const verifyForm = () => {
		let ok = true;
		let errors = [];

		// if (emei.trim().length < 15) {
		// 	ok = false;
		// 	errors.emei = true;
		// }

		if (!marca || marca.trim().length === 0) {
			ok = false;
			errors.marca = true;
		}
		if (!modelo || modelo.trim().length === 0) {
			ok = false;
			errors.modelo = true;
		}
		if (!cliente) {
			ok = false;
			errors.cliente = true;
		}
		if (!estado) {
			ok = false;
			errors.estado = true;
		}
		// if (files?.length == 1) {
		// 	ok = false;
		// 	errors.files = true;
		// }
		if (!observaciones || observaciones.trim().length === 0) {
			ok = false;
			errors.observaciones = true;
		}

		if (tieneContrasena) {
			if (!esPatron && contrasena.length == 0) {
				setPatronError(true);
				ok = false;
			} else {
				setPatronError(false);
			}
		}
		if (esPatron) {
			if (patron.length == 0) {
				setPatronError(true);
				ok = false;
			} else {
				setPatronError(false);
			}
		}
		setErrores(errors);
		if (ok) {
			return true;
		} else {
			return false;
		}
	};
	let imgs = [];

	// const imageChange = (e) => {
	// 	setFiles(e.target.files);
	// 	// for (let index = 0; index < e.target.files.length; index++) {
	// 	//   imgs.push(index);
	// 	// }

	// 	let arrayImg = [];
	// 	if (e.target.files) {
	// 		for (let index = 0; index < e.target.files.length; index++) {
	// 			console.log('images');

	// 			var reader = new FileReader();

	// 			reader.onload = (ev) => {
	// 				let img = ev.target.result;
	// 				arrayImg.push(img);
	// 			};
	// 			reader.readAsDataURL(e.target.files[index]);
	// 		}
	// 	}

	// 	console.log('lenght ' + arrayImg.length);
	// 	setLinkImages(arrayImg);
	// 	showMultiplesImg(e.target.files);
	// };

	return (
		<div className="work-add">
			<h3>Agregar Trabajo</h3>
			<form
				onSubmit={handleSubmitLogin}
				encType="multipart/form-data"
				method="POST"
				className="work-add-form"
			>
				<div className="grid-content">
					<div>
						<label>
							Marca
							<span className="text-red-600">*</span>
						</label>
						<input
							onChange={handleInputChange}
							value={marca}
							type="text"
							name="marca"
							placeholder="ingresa la marca"
						/>
						{errores.marca ? (
							<h5 className="bg-red-100 text-red-800 p-2 my-2 text-center">
								La marca es obligatoria
							</h5>
						) : null}
					</div>
					<div>
						<label>
							Modelo
							<span className="text-red-600">*</span>
						</label>
						<input
							onChange={handleInputChange}
							value={modelo}
							type="text"
							name="modelo"
							placeholder="ingresa el modelo"
						/>
						{errores.modelo ? (
							<h5 className="bg-red-100 text-red-800 p-2 my-2 text-center">
								El modelo es obligatoria
							</h5>
						) : null}
					</div>

					<div>
						<label>
							Cliente
							<span className="text-red-600">*</span>
						</label>
						<div>
							{/* <select
								value={cliente}
								onChange={handleInputChange}
								name="cliente"
							>
								<option value="" disabled>
									Elegir un cliente
								</option>
								{clients.map((clt) => (
									<option key={clt._id} value={clt._id}>
										{clt.dni.toString()}
									</option>
								))}
							</select> */}
							<input
								type="text"
								value={cliente}
								onChange={handleInputChange}
								name="cliente"
								list="clientes"
							/>
							<datalist name="cliente" id="clientes">
								<option value="" disabled>
									Elegir un cliente
								</option>
								{clients.map((clt) => (
									<option key={clt._id} value={clt._id}>
										{clt.dni.toString() + ' - ' + clt.name}
									</option>
								))}
							</datalist>
						</div>
						{errores.cliente ? (
							<h5 className="bg-red-100 text-red-800 p-2 my-2 text-center">
								Debe seleccionar un cliente
							</h5>
						) : null}
					</div>
					<div>
						<label>
							Estado
							<span className="text-red-600">*</span>
						</label>
						<select value={estado} onChange={handleInputChange} name="estado">
							<option value="" disabled>
								seleccionarEstado
							</option>
							{estados.map((est) => (
								<option key={est._id} value={est._id}>
									{' '}
									{est.name}{' '}
								</option>
							))}
						</select>
						{errores.estado ? (
							<h5 className="bg-red-100 text-red-800 p-2 my-2 text-center">
								El estado es obligatorio
							</h5>
						) : null}
					</div>
					<div>
						<label>
							Emei / Serie
							{/* <span className="text-red-600">*</span> */}
						</label>
						<input
							onChange={handleInputChange}
							value={emei}
							type="number"
							name="emei"
							min={1}
							minLength={25}
						/>
						{/* {errores.emei ? (
							<h5 className="bg-red-100 text-red-800 p-2 my-2 text-center">
								El emei es obligatoria, debe tener 15 numeros
							</h5>
						) : null} */}
					</div>
					<div>
						<label>recargo</label>
						<input
							value={recargo}
							onChange={handleInputChange}
							type="number"
							name="recargo"
							min={0}
						/>
					</div>
					<div>
						<label>precio</label>
						<input
							value={precio}
							onChange={handleInputChange}
							type="number"
							name="precio"
							min={0}
						/>
					</div>
					<div>
						<label>descuento</label>
						<input
							onChange={handleInputChange}
							type="number"
							name="descuento"
							value={descuento}
							min={0}
						/>
					</div>
				</div>
				<div>
					<label>
						Observaciones
						<span className="text-red-600">*</span>
					</label>
					<textarea
						value={observaciones}
						onChange={handleInputChange}
						name="observaciones"
					>
						{' '}
					</textarea>
					{errores.observaciones ? (
						<h5 className="bg-red-100 text-red-800 p-2 my-2 text-center">
							La(s) observaciones es obligatoria
						</h5>
					) : null}
					<label>Falla(s) Detectada(s)</label>
					<textarea
						value={fachasEncontradas}
						onChange={handleInputChange}
						name="fachasEncontradas"
					/>

					<label>Descripción del trabajo a realizar</label>
					<textarea
						value={descripcion}
						onChange={handleInputChange}
						name="descripcion"
					/>
				</div>
				<div className="flex items-center">
					<label className="labelPassword">¿Tienes contraseña ?</label>
					<input
						onClick={changeCheckPassword}
						name="tieneContrasena"
						className="checkPassword"
						type="checkbox"
					/>
				</div>

				<br />
				{checkPassword && (
					<div className="">
						<div className="flex items-center mb-1">
							<label className="labelPassword">¿Es patron ?</label>
							<input
								onClick={changeCheckPatron}
								className="checkPatron"
								name="checkPatron"
								type="checkbox"
							/>
						</div>

						<div id="input-password">
							<label>
								Contraseña <span className="text-red-500"> *</span>{' '}
							</label>
							<input
								value={contrasena}
								onChange={handleInputChange}
								name="contrasena"
								type="text"
								placeholder="ingresa su contraseña"
							/>
							{/* {errores.withoutPassword ? (
                <h5 className="bg-red-100 text-red-800 p-2 my-2 text-center">
                  La Contraseña es obligatoria
                </h5>
              ) : null} */}
						</div>
					</div>
				)}
				<br />
				{checkPatron && (
					<div className="patron grid grid-cols-3 gap-2 my-1">
						{numeros.map((n) => (
							<button
								type="button"
								key={n}
								onClick={(e) => {
									setContraseña(passwordPatron + e.target.textContent);
									values.patron = passwordPatron + e.target.textContent;
									e.target.classList.add('bg-blue-600');
									e.target.classList.add('text-gray-900');
									e.target.classList.add('cursor-not-allowed');
									e.target.classList.add('disabled');
								}}
								className=" flex justify-center m-auto dat w-12 h-12 flex items-center text-white justify-center cursor-pointer hover:bg-blue-600 duration-500 rounded-full bg-red-600"
							>
								{n}
							</button>
						))}
					</div>
				)}
				{patronError ? (
					<h5 className="bg-red-100 text-red-800 p-2 mt-4 text-center">
						La Contraseña es obligatoria
					</h5>
				) : null}

				<br />
				{checkPatron ? (
					<div className="text-center text-gray-700 p-2 mb-3 my-2 w-full bg-gray-100 shadow rouded">
						{passwordPatron}
					</div>
				) : null}

				{/* <div className="my-2">
					<label
						htmlFor="loadImg"
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
						className="loadImage gap-x-2 hover:bg-gray-800 bg-gray-900 text-white cursor-pointer flex justify-between p-1 rounded align-center"
					>
						<i className="fas fa-plus-circle text-center align-center text-white text-3xl  flex rounded-full p-1 justify-between"></i>
						<span className="text-white"> Subir Foto</span>
					</label>
					{errores.files ? (
						<h5 className="bg-red-100 text-red-800 p-2 my-2 text-center">
							Debe subir por lo menos 2 images o ninguna
						</h5>
					) : null}
					<input
						id="loadImg"
						onChange={imageChange}
						type="file"
						className="hidden"
						name="file"
						multiple
						accept="image/*"
					/>
				</div>
				<div className="images grid gap-2 grid-cols-3 p-2 bg-gray-300 shadow rounded">
					<img className={'image0 w-32 '} />
					<img className={'image1  w-32'} />
					<img className={'image2  w-32'} />
				</div>
				<br /> */}

				<button className="btn" type="submit">
					{loading ? 'Espere...' : '  Agregar Trabajo'}
				</button>
			</form>
		</div>
	);
};
