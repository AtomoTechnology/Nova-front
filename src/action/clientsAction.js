import {
	fetchWithOutToken,
	fetchWithToken,
} from '../helpers/fetchWithOutToken';
import { types } from '../types/types';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
	toast: true,
	position: 'bottom-end',
	showConfirmButton: false,
	timer: 2000,
	timerProgressBar: true,
	didOpen: (toast) => {
		toast.addEventListener('mouseenter', Swal.stopTimer);
		toast.addEventListener('mouseleave', Swal.resumeTimer);
	},
});

export const startGettingAllClient = () => {
	return async (dispatch) => {
		try {
			const resp = await fetchWithToken('clients');
			const clients = await resp.json();
			if (clients.ok) {
				dispatch(getClients(clients.clients));
			}
			//   console.log(clients.clients);
		} catch (error) {
			console.log(error);
		}
	};
};

export const startGettingOneClient = (clientId) => {
	return async (dispatch) => {
		try {
			const resp = await fetchWithToken(`clients/${clientId}`);
			const client = await resp.json();
			if (client.ok) {
				dispatch(setOneClient(client.client));
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const startEditClient = (data, clientId) => {
	return async (dispatch) => {
		try {
			const resp = await fetchWithToken(`clients/${clientId}`, data, 'PUT');
			const body = await resp.json();
			//   const worksEditOk = convertDate(body.updateWork);
			console.log(body);
			if (body.ok) {
				dispatch(setOneClient(body.clientModified));
				Toast.fire({
					icon: 'success',
					title: 'Cliente editado con exito!!!',
				});
			} else {
				Toast.fire({
					icon: 'error',
					title: body.msg,
				});
			}
		} catch (error) {
			Toast.fire({
				icon: 'error',
				title: error,
			});
		}
	};
};
export const startDeleteClient = (clientId) => {
	console.log(clientId);
	return async (dispatch) => {
		try {
			const resp = await fetchWithToken(`clients/${clientId}`, [], 'DELETE');
			const body = await resp.json();
			//   const worksEditOk = convertDate(body.updateWork);
			console.log(body);
			if (body.ok) {
				Toast.fire({
					icon: 'success',
					title: 'Cliente Borrado con exito',
				});
			} else {
				Swal.fire('error', body.msg, 'error');
			}
		} catch (error) {
			Swal.fire('error', error, 'error');
		}
	};
};

export const startCreatingClient = (client, file) => {
	return async (dispatch) => {
		try {
			// console.log(client);
			// console.log(file)
			// const resp = await fetchWithToken("clients", client, "POST");
			// console.log(resp);
			// const clientCreated = await resp.json();
			// console.log(clientCreated);
			// if (clientCreated.ok) {
			if (file) {
				const res = await fetchWithOutToken('clients/upload', { file }, 'POST');
				// const formData = new FormData();
				// formData.append("file", file);
				// const token = localStorage.getItem("token") || "";
				// const resp1 = await axios.post(
				//   `${process.env.REACT_APP_URL}clients/uploadFile`,
				//   formData,
				//   {
				//     Headers: {
				//       "Content-Type": "multipart/form-data",
				//       // "x-token": token,
				//     },
				//   }
				// );
				const body = await res.json();
				console.log(body);
				if (body.ok) {
					client.pathImg = body.url;
					console.log(client);
					const resp = await fetchWithToken('clients', client, 'POST');
					const clientCreated = await resp.json();
					console.log(clientCreated);
					if (clientCreated.ok) {
						Toast.fire({
							icon: 'success',
							title: clientCreated.msg,
						});
					}
				}
			} else {
				const resp = await fetchWithToken('clients', client, 'POST');
				const clientCreated = await resp.json();
				console.log(clientCreated);
				if (clientCreated.ok) {
					Toast.fire({
						icon: 'success',
						title: clientCreated.msg,
					});
				} else {
					Toast.fire({
						icon: 'error',
						title: clientCreated.msg,
					});
				}
			}

			// }
		} catch (error) {
			console.log(error);
			Toast.fire({
				icon: 'error',
				title: error,
			});
		}
	};
};

const updateClientAvatar = (client) => {
	return async (dispatch) => {
		const resp = await fetchWithToken(`clients/${client._id}`, client, 'PUT');
		const body = await resp.json();
		console.log(body);
	};
};

export const getWorksClient = (idClient) => {
	return async (dispatch) => {
		try {
			const resp = await fetchWithToken(`works/client/${idClient}`);
			const works = await resp.json();
			if (works.ok) {
				dispatch(setClientWorks(works.works));
			} else {
				dispatch(resetWorksClient());
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const getClientSearch = (clients) => {
	return (dispatch) => {
		console.log(clients);
		dispatch(setClientsSearch(clients));
	};
};

const setClientsSearch = (clients) => ({
	type: types.filtrarClient,
	payload: clients,
});

const resetWorksClient = () => ({
	type: types.resetWorksClient,
});

const setClientWorks = (works) => ({
	type: types.setWorksClient,
	payload: works,
});

const setOneClient = (client) => ({
	type: types.setOneClient,
	payload: client,
});

const getClients = (clts) => ({
	type: types.getAllClients,
	payload: clts,
});
