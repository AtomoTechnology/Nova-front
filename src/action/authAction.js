import { fetchWithOutToken, fetchWithToken } from '../helpers/fetchWithOutToken.js';
import { types } from '../types/types.js';

import Swal from 'sweetalert2';

export const startLogin = (dni, password) => {
  return async (dispatch) => {
    console.log(dni, password);
    const resp = await fetchWithOutToken('users/signin', { dni, password }, 'POST');
    const body = await resp.json();
    console.log(body);
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
    } else {
      Swal.fire('error', body.message, 'error');
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
    const resp = await fetchWithToken('users/renewToken', {}, 'POST');

    const body = await resp.json();
    console.log(body);

    if (body.status === types.statusSuccess) {
      console.log('validoooo');
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-start-date', new Date().getTime());
      dispatch(
        login({ uid: body.data.user._id, username: body.data.user.name, role: body.data.user.role })
      );
    } else {
      console.log('heree logout ');

      dispatch(finishChecking());
      dispatch(startLogout());
      // window.location = '/login';
      // return;
    }
  };
};

export const startLogout = () => {
  return (dispatch) => {
    console.log('heree logout ');
    localStorage.removeItem('token');
    localStorage.removeItem('token-start-date');
    dispatch(logout());
    // console.log("logout");
  };
};
export const updatePassword = (data) => {
  return async (dispatch) => {
    const resp = await fetchWithToken('users/updateMyPassword', data, 'PATCH');
    const body = await resp.json();
    console.log(body);
    if (body.status === types.statusSuccess) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-start-date', new Date().getTime());
      dispatch(
        login({ uid: body.data.user._id, username: body.data.user.name, role: body.data.user.role })
      );
      Swal.fire('Exito', 'Tu contraseña se cambió con exito', 'success');
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
