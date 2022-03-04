import { fetchWithToken } from '../helpers/fetchWithOutToken';
import { types } from '../types/types';

import Swal from 'sweetalert2';
const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 4000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

export const getAllWorks = (limit, page = 1) => {
  return async (dispatch) => {
    try {
      const works = await fetchWithToken(`works`);
      const body = await works.json();
      if (body.status === types.statusSuccess) {
        dispatch(setWorks(body.data.works, body.total, body.results));
      }
    } catch (error) {}
  };
};
export const GetHistories = (startDate, endDate) => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken('works/historialWork/all', { startDate, endDate }, 'POST');
      const works = await resp.json();
      if (works.status === types.statusSuccess) {
        dispatch(setHistories(works.data.data));
      }
    } catch (error) {
      throw error;
    }
  };
};

export const getOneWork = (workId) => {
  return async (dispatch) => {
    try {
      const work = await fetchWithToken(`works/${workId}`);
      const body = await work.json();
      if (body.ok) {
        dispatch(setWorkOne(body.work));
      } else {
        Toast.fire({
          icon: 'error',
          title: 'Error al recuperar los datos del cliente',
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

export const createWork = (work) => {
  return async (dispatch) => {
    try {
      let precio = parseInt(work.precio);
      let descuento = (precio * parseInt(work.descuento)) / 100;
      let recargo = (precio * work.recargo) / 100;
      work.total = precio + recargo - descuento;
      const res2 = await fetchWithToken('works', work, 'POST');
      const body2 = await res2.json();
      if (body2.status === types.statusSuccess) {
        Toast.fire({
          icon: 'success',
          title: 'Se agregó con exito el trabajo!!!',
        });
      } else {
        Toast.fire({
          icon: 'error',
          title: body2.message,
        });
      }
    } catch (error) {
      Swal.fire('error', 'Hubo un fallo al hacer la petition...', 'error');
    }
  };
};

export const startEditWork = (work, workId, onlyState = false) => {
  return async (dispatch) => {
    try {
      if (!onlyState) {
        let precio = parseInt(work.precio);
        let descuento = (precio * parseInt(work.descuento)) / 100;
        let recargo = (precio * work.recargo) / 100;
        work.total = precio + recargo - descuento;
      }

      const resp = await fetchWithToken(`works/${workId}`, work, 'PATCH');
      const body = await resp.json();
      if (body.status === types.statusSuccess) {
        dispatch(setWorkOne(body.data.work));
        Toast.fire({
          icon: 'success',
          title: 'Trabajo editado con exito!!!',
        });
      } else {
        Swal.fire('error', body.message, 'info');
      }
    } catch (error) {
      Swal.fire('error', error, 'error');
    }
  };
};

export const DeleteWork = (workId) => {
  return async (dispatch) => {
    try {
      const res = await fetchWithToken(`works/${workId}`, {}, 'DELETE');
      const body = await res.json();
      if (body.status === types.statusSuccess) {
        Toast.fire({
          icon: 'success',
          title: 'Trabajo borrado con exito!!!',
        });
      } else {
        Swal.fire('error', body.message, 'info');
      }
    } catch (error) {
      Swal.fire('error', error.message, 'error');
    }
  };
};

export const filterWorksState = (estado, works) => {
  return (dispatch) => {
    dispatch(filterState(estado, works));
  };
};

const filterState = (estado, works) => ({
  type: types.filterWorksState,
  payload: {
    estado,
    works,
  },
});

const setWorks = (works, total, results) => ({
  type: types.getAllWorks,
  payload: {
    works,
    total,
    results,
  },
});
const setHistories = (works) => ({
  type: types.getAllHistories,
  payload: {
    works,
  },
});
const setWorkOne = (work) => ({
  type: types.setOneWork,
  payload: work,
});
