import { useState } from 'react';
import { fetchWithOutToken } from '../../helpers/fetchWithOutToken';
import { useForm } from '../../hooks/useForm';
import { showAlert } from '../alerts';
import moment from 'moment';

export const CheckState = ({ history }) => {
  const [values, handleInputChange] = useForm({ codigo: '' });
  const [ok, setOk] = useState(true);
  const [loading, setLoading] = useState(false);
  const { codigo } = values;
  const [work, setWork] = useState(null);

  const CheckWork = async (e) => {
    e.preventDefault();
    if (codigo && codigo.length === 6) {
      setOk(true);
      setLoading(true);
      try {
        const res = await fetchWithOutToken('works/code', values, 'POST');
        const data = await res.json();
        if (data.status === 'success') {
          setWork(data.work);
        } else {
          throw new Error(data.message);
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
    <div className="justify-center flex-col gap-4 items-center p-8 m-0 min-h-screen bg-gray-800 flex">
      <i
        onClick={() => {
          history.goBack();
        }}
        className="fas fa-arrow-circle-left  text-white text-3xl w-12 h-12 rounded-full jhm-shadow flex items-center duration-150 justify-center bg-red-500 cursor-pointer hover:bg-red-600"
      ></i>
      <form
        style={{ width: '330px' }}
        onSubmit={CheckWork}
        autoComplete="off"
        className="bg-white p-8 mx-3 h-auto shadow-xl w rounded-sm form flex flex-col justify-start items-center"
      >
        <h3 className="self-start title-form !text-lg login-header-title">Consulta de Trabajo</h3>

        <fieldset>
          <label htmlFor="codigo">codigo</label>
          <input
            type="codigo"
            value={codigo}
            onChange={handleInputChange}
            placeholder="Ingrese el codigo"
            name="codigo"
          />
          {!ok && <span className="alert-error"> el codigo es obligatorio y debe tener 6 caracteres </span>}
        </fieldset>

        <fieldset>
          <button
            type="submit"
            className="btn  text-white text-lg uppercase shadow-2xl hover:bg-red-600 jhm-shadow self-start btn-login bg-red-500"
          >
            {loading ? 'Consultando...' : 'Consultar'}
          </button>
        </fieldset>
      </form>
      {work && (
        <div
          style={{ width: '330px' }}
          className="result text-left bg-white gap-2 p-8 mx-3  h-auto shadow-xl rounded-sm  flex flex-col justify-start "
        >
          <p className=" text-left">
            {' '}
            Equipo :
            <span className="text-blue-500 ml-2 ">
              {' '}
              {work.modelo} {' - '} {work.marca}
            </span>{' '}
          </p>
          <p className=" text-left">
            {' '}
            Estado :<span className="text-pink-500 ml-2 ">{work.estado.name}</span>
          </p>
          <span
            className="text-gray-800 cursor-pointer"
            onClick={() => {
              document.querySelector('.list-states').classList.toggle('hidden');
              document.querySelector('.see-menos-detail').classList.toggle('hidden');
              document.querySelector('.see-more-detail').classList.toggle('hidden');
            }}
          >
            Mas Detalle <i className="fas fa-angle-down see-more-detail text-gray-700"></i>
            <i className="fas fa-angle-up hidden see-menos-detail text-gray-700"></i>
          </span>

          <ul className="pl-4 list-states hidden" style={{ listStyle: 'inside' }}>
            {work.states.map((e) => (
              <li key={e._id} className="text-sm ">
                {' '}
                <span className="text-pink-500 ml-2 ">{e.nombre}</span>
                <span className=" ml-2">{moment(e.fecha).format('ll')} </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
