import { fetchWithOutToken, fetchWithToken } from '../helpers/fetchWithOutToken';
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
      const resp = await fetchWithToken('users');
      const users = await resp.json();
      if (users.status === types.statusSuccess) {
        dispatch(getClients(users.data.users));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const startGettingOneClient = (clientId) => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken(`users/${clientId}`);
      const user = await resp.json();
      if (user.status === types.statusSuccess) {
        console.log(user);
        dispatch(setOneClient(user.data.user));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const startEditClient = (data, clientId) => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken(`users/${clientId}`, data, 'PATCH');
      const body = await resp.json();
      //   const worksEditOk = convertDate(body.updateWork);
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
  console.log(clientId);
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken(`users/${clientId}`, [], 'DELETE');
      console.log(resp);
      const body = await resp.json();
      //   const worksEditOk = convertDate(body.updateWork);
      console.log(body);
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
      console.log(user);
      // return;
      const resp = await fetchWithOutToken('users/signup', user, 'POST');
      const clientCreated = await resp.json();
      if (clientCreated.status === types.statusSuccess) {
        Toast.fire({
          icon: 'success',
          title: 'Usuario creado con existo.',
        });
      } else {
        Toast.fire({
          icon: 'error',
          title: clientCreated.message,
        });
      }
      // console.log(client);
      // console.log(file)
      // const resp = await fetchWithToken("clients", client, "POST");
      // console.log(resp);
      // const clientCreated = await resp.json();
      // console.log(clientCreated);
      // if (clientCreated.ok) {
      // if (file) {
      //   // const res = await fetchWithOutToken('clients/upload', { file }, 'POST');
      //   // const formData = new FormData();
      //   // formData.append("file", file);
      //   // const token = localStorage.getItem("token") || "";
      //   // const resp1 = await axios.post(
      //   //   `${process.env.REACT_APP_URL}clients/uploadFile`,
      //   //   formData,
      //   //   {
      //   //     Headers: {
      //   //       "Content-Type": "multipart/form-data",
      //   //       // "x-token": token,
      //   //     },
      //   //   }
      //   // );
      //   // const body = await res.json();
      //   // console.log(body);
      //   // if (body.ok) {
      //   //   user.pathImg = body.url;
      //   //   console.log(user);
      //   //   const resp = await fetchWithToken('clients', user, 'POST');
      //   //   const clientCreated = await resp.json();
      //   //   console.log(clientCreated);
      //   //   if (clientCreated.ok) {
      //   //     Toast.fire({
      //   //       icon: 'success',
      //   //       title: clientCreated.msg,
      //   //     });
      //   //   }
      //   // }
      // } else {

      // }

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

// const updateClientAvatar = (client) => {
//   return async (dispatch) => {
//     const resp = await fetchWithToken(`clients/${client._id}`, client, 'PUT');
//     const body = await resp.json();
//     console.log(body);
//   };
// };

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
