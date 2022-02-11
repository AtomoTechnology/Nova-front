import { fetchWithOutToken, fetchWithToken } from '../helpers/fetchWithOutToken.js';
import { types } from '../types/types.js';

import Swal from 'sweetalert2';
import { showAlert } from '../components/alerts.js';

export const startLogin = (dni, password) => {
  return async (dispatch) => {
    const resp = await fetchWithOutToken('users/signin', { dni, password }, 'POST');
    const body = await resp.json();
    if (body.status === types.statusSuccess) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-start-date', new Date().getTime());
      dispatch(
        login({
          uid: body.data.user._id,
          username: body.data.user.name,
          role: body.data.user.role,
        })
      );
      // showAlert('success', 'Inicio de sesion con exito');
    } else {
      showAlert('error', body.message);
    }
  };
};

export const startChecking = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken('users/renewToken', {}, 'POST');
      const body = await resp.json();
      if (body.status === types.statusSuccess) {
        localStorage.setItem('token', body.token);
        localStorage.setItem('token-start-date', new Date().getTime());
        dispatch(login({ uid: body.data.user._id, username: body.data.user.name, role: body.data.user.role }));
      } else {
        dispatch(finishChecking());
        dispatch(startLogout());

        // console.log(body);
        // window.location.reload();
        // showAlert('error', 'Se expiró tu sesíon. Por favor conectate de nuevo.');
      }
    } catch (error) {
      showAlert('error', error.message);
    }
  };
};

export const startLogout = () => {
  return (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('token-start-date');
    dispatch(logout());
  };
};
export const updatePassword = (data) => {
  return async (dispatch) => {
    const resp = await fetchWithToken('users/updateMyPassword', data, 'PATCH');
    const body = await resp.json();
    if (body.status === types.statusSuccess) {
      showAlert('success', 'Tu contraseña se cambió con exito');
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-start-date', new Date().getTime());
      dispatch(login({ uid: body.data.user._id, username: body.data.user.name, role: body.data.user.role }));
    } else {
      Swal.fire('Actual Contraseña ', body.message, 'error');
    }
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
