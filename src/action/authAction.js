import {
	fetchWithOutToken,
	fetchWithToken,
} from '../helpers/fetchWithOutToken.js';
import { types } from '../types/types.js';

import Swal from 'sweetalert2';

export const startLogin = (username, password) => {
	return async (dispatch) => {
		console.log(username, password);
		const resp = await fetchWithOutToken(
			'auth/login',
			{ username, password },
			'POST'
		);
		const body = await resp.json();
		console.log(body);
		if (body.ok) {
			localStorage.setItem('token', body.token);
			localStorage.setItem('token-start-date', new Date().getTime());
			dispatch(
				login({ uid: body.uid, username: body.username, role: body.role })
			);
		} else {
			Swal.fire('error', body.msg, 'error');
		}
	};
};

export const startRegister = (username, password, role = 'user') => {
	return async (dispatch) => {
		const resp = await fetchWithOutToken(
			'auth/createUser',
			{ username, password, role: 'user' },
			'POST'
		);

		const body = await resp.json();

		if (body.ok) {
			// localStorage.setItem("token", body.token);
			// localStorage.setItem("token-start-date", new Date().getTime());
			// dispatch(
			//   login({ uid: body.uid, username: body.username, role: body.role })
			// );
			Swal.fire({
				position: 'center',
				icon: 'success',
				title: 'Usuario registrado con exito...',
				showConfirmButton: false,
				timer: 3000,
			});
		} else {
			Swal.fire('error', body.msg, 'error');
		}
	};
};

export const startChecking = () => {
	return async (dispatch) => {
		console.log();
		const resp = await fetchWithToken('auth/renewJwt');

		const body = await resp.json();

		if (body.ok) {
			localStorage.setItem('token', body.token);
			localStorage.setItem('token-start-date', new Date().getTime());
			dispatch(
				login({ uid: body.uid, username: body.username, role: body.role })
			);
		} else {
			dispatch(finishChecking());
		}
	};
};

export const startLogout = () => {
	return (dispatch) => {
		localStorage.removeItem('token');
		localStorage.removeItem('token-start-date');
		dispatch(logout());
		// console.log("logout");
	};
};

const logout = () => ({
	type: types.logout,
});

const finishChecking = () => ({
	type: types.finishChecking,
});

const login = (user) => ({
	type: types.startLogin,
	payload: user,
});
