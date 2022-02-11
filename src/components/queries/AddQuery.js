import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchWithToken } from '../../helpers/fetchWithOutToken';
import { useForm } from '../../hooks/useForm';
import { showAlert } from '../alerts';

export const AddQuery = ({ history }) => {
  console.log(history);
  const [values, handleInputChange, reset] = useForm({ message: '' });
  const [ok, setOk] = useState(true);
  const [loading, setLoading] = useState(false);
  const { message } = values;
  const { username } = useSelector((state) => state.auth);

  const Add = async (e) => {
    e.preventDefault();
    if (message) {
      setOk(true);
      setLoading(true);
      try {
        const res = await fetchWithToken('queries', values, 'POST');
        const data = await res.json();
        if (data.status === 'success') {
          showAlert('success', 'Tu consulta se mandó con exito.');
          reset();
          console.log(data);
          history.push('/queries');
        } else {
          throw new Error(data.message);
          // showAlert('error', data.message);
        }
      } catch (error) {
        showAlert('error', error.message);
      }
    } else {
      setOk(false);
    }
    setLoading(false);
  };

  return (
    <div className="justify-center flex-col gap-4 items-center p-8 m-0 h-screen bg-gray-800 flex">
      <form
        onSubmit={Add}
        autoComplete="off"
        className="bg-white p-8 mx-3 h-auto shadow-xl w rounded-sm form flex flex-col justify-start items-center"
      >
        <h3 className="self-start title-form !text-lg login-header-title">¿En que te podemos ayudar {username} </h3>

        <fieldset>
          <label htmlFor="codigo">Mensaje</label>
          <textarea
            type="text"
            value={message}
            onChange={handleInputChange}
            placeholder="Ingrese tu consulta"
            name="message"
            cols="30"
            rows="10"
          ></textarea>
          {!ok && <span className="alert-error"> El mensaje es obligatorio. </span>}
        </fieldset>

        <fieldset>
          <button
            type="submit"
            disabled={loading}
            className="btn  text-white text-lg uppercase shadow-2xl hover:bg-red-600 jhm-shadow self-start btn-login bg-red-500"
          >
            {loading ? 'Consultando...' : 'Consultar'}
          </button>
        </fieldset>
      </form>
    </div>
  );
};
