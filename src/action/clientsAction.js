import { fetchWithOutToken, fetchWithToken } from '../helpers/fetchWithOutToken';
import { types } from '../types/types';
import Swal from 'sweetalert2';
import { showAlert } from '../components/alerts';

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

export const startGettingAllClient = (page, limit) => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken(`users?page=${page}&limit=${limit}`);
      const users = await resp.json();
      if (users.status === types.statusSuccess) {
        console.log(users);
        dispatch(getClients(users.data.users, users.page, users.totalPage, users.results));
      }
    } catch (error) {}
  };
};

export const startGettingOneClient = (clientId) => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken(`users/${clientId}`);
      const user = await resp.json();
      if (user.status === types.statusSuccess) {
        dispatch(setOneClient(user.data.user));
      }
    } catch (error) {}
  };
};

export const startEditClient = (data, clientId) => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken(`users/${clientId}`, data, 'PATCH');
      const body = await resp.json();
      if (body.status === types.statusSuccess) {
        dispatch(setOneClient(body.data.user));
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
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken(`users/${clientId}`, [], 'DELETE');
      const body = await resp.json();
      if (body.status === types.statusSuccess) {
        Toast.fire({
          icon: 'success',
          title: 'Cliente Borrado con exito',
        });
      } else {
        Swal.fire('error', body.message, 'error');
      }
    } catch (error) {
      Swal.fire('error', error, 'error');
    }
  };
};

export const startCreatingClient = (user, file) => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithOutToken('users/signup', user, 'POST');
      const result = await resp.json();
      console.log(result);
      if (result.status === types.statusSuccess) {
        showAlert('success', 'Cuenta creada con exito.🙌👏✔.Ahora podes iniciar sesion');
        setTimeout(() => {
          window.location = '/login';
        }, 3000);
      } else {
        showAlert('error', result.message);
        // window.location = '/login';
      }
    } catch (error) {
      showAlert('error', error.message);
      // window.location = '/login';
    }
  };
};

export const getWorksClient = (idClient) => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken(`works/client/${idClient}`);
      const works = await resp.json();
      if (works.status === types.statusSuccess) {
        dispatch(setClientWorks(works.data.works));
      } else {
        dispatch(resetWorksClient());
      }
    } catch (error) {}
  };
};

export const getClientSearch = (clients) => {
  return (dispatch) => {
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

const setClientWorks = (works, page, totalPage, results) => ({
  type: types.setWorksClient,
  payload: {
    works,
  },
});

const setOneClient = (client) => ({
  type: types.setOneClient,
  payload: client,
});

const getClients = (users, page, totalPage, results) => ({
  type: types.getAllClients,
  payload: {
    users,
    page,
    totalPage,
    results,
  },
});
