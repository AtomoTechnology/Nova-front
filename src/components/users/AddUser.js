import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { startCreatingClient } from '../../action/clientsAction';
import { showImg } from '../../helpers/CodeShowImg';
import { useForm } from '../../hooks/useForm';

export const AddUser = ({ history }) => {
	const dispatch = useDispatch();
	const [file, setFile] = useState('');
	const [errores, setErrores] = useState([]);
	const [addingUser, setAddingUser] = useState(false);
	const [urlImagen, setUrlImagen] = useState('');

	const [values, handleInputChange, reset] = useForm({
		name: '',
		dni: '',
		phone1: '',
		phone2: '',
		direction: '',
		nota: '',
		file: '',
		pathImg: '',
	});

	let { name, dni, phone1, phone2, direction, nota } = values;

	const imageChange = (e) => {
		// setFile(e.target.files[0]);
		console.log(e.target.files[0].size);
		if (e.target.files[0]) {
			var reader = new FileReader();

			reader.onload = (ev) => {
				let img = ev.target.result;
				setUrlImagen(img);
				document.querySelector('.imgLoad').setAttribute('src', img);
			};
			reader.readAsDataURL(e.target.files[0]);
		}
		// showImg(e.target.files[0]);
	};

	// do the login method
	const handleCreateClient = async (e) => {
		setAddingUser(true);
		e.preventDefault();
		if (verifyForm()) {
			console.log(urlImagen);
			dispatch(startCreatingClient(values, urlImagen));
			reset();
			setTimeout(() => {
				history.push('/clients');
				// window.location.href = '/clients';
				// window.location.replace('/clients');
			}, 1000);
			// window.location.reload(true);
		} else {
			console.log(errores);
		}
		setAddingUser(false);
	};
	// varify the form values
	const verifyForm = () => {
		let ok = true;
		let errors = [];

		if (!name || name.trim().length === 0) {
			ok = false;
			errors.name = true;
		}
		// if (!direction || direction.trim().length === 0) {
		//   ok = false;
		//   errors.direction = true;
		// }
		if (!dni || dni.length < 8 || dni.length > 11) {
			ok = false;
			errors.dni = true;
		}
		if (!phone1 || phone1.length < 7) {
			ok = false;
			errors.phone1 = true;
		}
		setErrores(errors);
		if (ok) {
			return true;
		} else {
			return false;
		}
	};

	return (
		<div className="user-add ">
			<form
				onSubmit={handleCreateClient}
				className="user-add-form shadow-lg rounded-md"
			>
				<h3>Agregar Cliente</h3>
				<div className="form-grid">
					<div>
						<label>
							Nombre Cliente <span className="text-red-600">*</span>
						</label>
						<input
							onChange={handleInputChange}
							value={name}
							type="text"
							name="name"
							placeholder="ingresa el nombre"
							className="shadow"
						/>
						{errores.name ? (
							<span className="text-red-500 text-center bg-red-100 p-1">
								El nombre es obligatorio
							</span>
						) : null}{' '}
					</div>
					<div>
						<label>
							DNI <span className="text-red-600">*</span>
						</label>
						<input
							onChange={handleInputChange}
							value={dni}
							type="text"
							placeholder="ingresa el dni"
							name="dni"
							className="shadow"
						/>
						{errores.dni ? (
							<span className="text-red-500 text-center bg-red-100 p-1">
								El dni es obligatorio. [8 , 11] digitos
							</span>
						) : null}
					</div>
					<div>
						<label>
							Telefono 1 <span className="text-red-600">*</span>
						</label>
						<input
							onChange={handleInputChange}
							value={phone1}
							type="text"
							name="phone1"
							placeholder="ingresa el numero de celular"
							className="shadow"
						/>
						{errores.phone1 ? (
							<span className="text-red-500 text-center bg-red-100 p-1">
								Tenes que ingregar por lo menos un celular
							</span>
						) : null}
					</div>
					<div>
						<label>Telefono 2</label>
						<input
							onChange={handleInputChange}
							value={phone2}
							type="text"
							name="phone2"
							placeholder="ingresa el segundo telefono"
							className="shadow"
						/>{' '}
					</div>
					<div>
						<label>Dirección</label>
						<input
							className="shadow"
							onChange={handleInputChange}
							value={direction}
							type="text"
							name="direction"
							placeholder="ingresa la direccion"
						/>
					</div>
					<div>
						<label>Nota</label>
						<input
							className="shadow"
							onChange={handleInputChange}
							value={nota}
							type="text"
							name="nota"
							placeholder="ingresa una nota"
						/>
					</div>

					{/* <div className="img  bg-gray-200 p-10 "> */}
					{/* </div> */}
				</div>
				<div className="my-2">
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
					<input
						id="loadImg"
						onChange={imageChange}
						type="file"
						className="hidden"
						name="file"
						accept="image/*"
					/>
				</div>
				<img className="w-32 imgLoad" />
				<br />
				<button disabled={addingUser} className="btn shadow-lg" type="submit">
					{addingUser ? 'agregando Usuario' : ' Agregar Cliente'}
				</button>
			</form>
		</div>
	);
};
