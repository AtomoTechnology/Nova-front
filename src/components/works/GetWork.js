import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteWork, getOneWork, startEditWork } from '../../action/worksAction';
import { useForm } from '../../hooks/useForm';
import { startGettingAllClient } from '../../action/clientsAction';
import { Link } from 'react-router-dom';
import userLogo from '../../templatePics/userLogo.png';
import { fetchWithToken } from '../../helpers/fetchWithOutToken';
import moment from 'moment';
import { GetStates } from '../../helpers/getStates';
import Swal from 'sweetalert2';

const GetWork = ({ match, history }) => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(startGettingAllClient());
  // }, [dispatch]);
  // const { clients } = useSelector((state) => state.clients);
  const [l, setL] = useState(200);
  const { role } = useSelector((state) => state.auth);
  const [estados, setEstados] = useState([]);
  const [errores, setErrores] = useState([]);
  const [allStateWork, setAllStateWork] = useState([]);
  const [reload, setReload] = useState(false);
  const workId = match.params.workId;

  useEffect(() => {
    dispatch(getOneWork(workId));
  }, [dispatch, workId]);

  useEffect(async () => {
    const states = await GetStates();
    setEstados(states.data.states);
  }, [setEstados]);

  const { work } = useSelector((state) => state.works);

  // const [values, handleInputChange, reset] = useForm({
  //   marca: work?.marca,
  //   modelo: work?.modelo,
  //   emei: work?.emei,
  //   estado: work?.estado._id,
  //   precio: work?.precio,
  //   descuento: work?.descuento,
  //   fachasEncontradas: work?.fachasEncontradas,
  //   observaciones: work?.observaciones,
  //   descripcion: work?.descripcion,
  //   recargo: work?.recargo,
  //   cliente: work?.cliente,
  //   fechaInicio: work?.fechaInicio,
  //   fechaFin: work?.fechaFin,
  // });

  useEffect(() => {
    async function fetchStates() {
      if (work?.states.length <= 0) {
        const query = await fetchWithToken(`work_state/getStates/${workId}`);
        const ws = await query.json();
        if (ws.ok) {
          setAllStateWork(ws.workState.state);
        }
      }
    }
    fetchStates();
  }, [workId]);

  // const {
  //   marca,
  //   modelo,
  //   emei,
  //   estado,
  //   precio,
  //   descuento,
  //   fachasEncontradas,
  //   descripcion,
  //   observaciones,
  //   recargo,
  // } = values;
  const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  let color = '';
  switch (work?.estado.name) {
    case 'Revision':
      color = 'text-red-700';
      break;
    case 'Presupuesto':
      color = 'text-gray-400';
      break;
    case 'En Reparación':
      color = 'text-yellow-500';
      break;
    case 'Terminado':
      color = 'text-green-200';
      break;

    default:
      color = 'text-green-500';
      break;
  }

  const handleObservaciones1 = (e) => {
    setL(work?.observaciones.length);
    e.target.classList.add('hidden');
    document.querySelector('.ver-menos').classList.remove('hidden');
  };

  const handleObservaciones2 = (e) => {
    setL(200);
    e.target.classList.add('hidden');
    document.querySelector('.ver-mas').classList.remove('hidden');
  };

  const DeleteWorkById = () => {
    Swal.fire({
      title: 'Estás seguro ?',
      text: 'Al aceptar se borrará el trabajo definitivamente!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // setIdChange(work?._id);
        dispatch(DeleteWork(workId));
        history.push('/works');
      }
    });
  };

  return (
    <div className="one-work relative">
      <div className="absolute text-center uppercase flex gap-2  ">
        <button
          onClick={() => {
            history.goBack();
          }}
          className="text-white w-8 h-8 bg-gray-600 p-1 rounded-full hover:bg-gray-800 "
        >
          <i className="fas fa-arrow-circle-left"></i>
        </button>
        {role !== 'user' && (
          <>
            <Link
              to={`/work/edit/${workId}`}
              className="text-white bg-pink-600 p-1 w-8 h-8 rounded-full hover:bg-pink-800  "
            >
              <i className="fas fa-edit"></i>
            </Link>
            <button
              onClick={DeleteWorkById}
              className="text-white w-8 h-8 bg-red-600 p-1 rounded-full hover:bg-red-800 "
            >
              <i className="fas fa-trash"></i>
            </button>
          </>
        )}
      </div>

      <div className="one-work-grid">
        <i className={' fas fa-mobile-alt flex justify-center items-center ' + color}></i>
        <div className="one-work-body grid grid-cols-2 grid-rows-2 gap-2">
          <div className="work-data shadow rounded bg-gray-700 text-white p-1">
            <p>Codigo : {work?.codigo} </p>
            <p>Marca : {work?.marca} </p>
            <p>Modelo : {work?.modelo}</p>
            <p>Imei : {work?.emei}</p>
            <p>
              Estado:
              {work?.estado.name}
            </p>
            {work?.tieneContrasena && <p>Contraseña : {work?.contrasena}</p>}
          </div>
          {work?.cliente ? (
            <div className="client-data rounded shadow bg-pink-500 p-1">
              <img className="rounded-full h-12 w-12" src={userLogo} alt="logo user" />
              <p>
                Cliente :{' '}
                <Link className="underline text-white" to={`/clients/${work?.cliente?._id}`}>
                  {' '}
                  {work?.cliente?.name}{' '}
                </Link>
              </p>
              <p>DNI : {work?.cliente?.dni}</p>
              <p>Celular 1 : {work?.cliente?.phone1}</p>
            </div>
          ) : (
            <div className="cliente-no-existe flex justify-center items-center text-white text-center client-data rounded shadow bg-pink-700">
              <h3>
                Cliente no encontrado... <br />
                Puede ser que se haya borrado anteriormente.
              </h3>
            </div>
          )}

          <div className="price-data rounded shadow bg-blue-400 p-1">
            <p>Precio: {work?.precio}</p>
            <p>Pecargo: {work?.recargo}</p>
            <p>descuento: {work?.descuento}</p>
            <p>Total: {work?.total}</p>
          </div>

          <div className="price-data rounded shadow bg-red-400 p-1">
            <span className="text-white text-lg underline">Historiales de Estados </span>
            <ol>
              {work?.states.map((stw) => (
                <li>{stw.nombre + ' - ' + moment(stw.fecha).format('DD-MM-YY HH:mm:ss')}</li>
              ))}

              {/* {work?.states?.length > 0
                ? work?.states.map((stw) => (
                    <li>{stw.nombre + ' - ' + moment(stw.fecha).format('DD-MM-YY HH:mm:ss')}</li>
                  ))
                : allStateWork.map((stw) => (
                    <li>{stw.nombre + ' - ' + moment(stw.fecha).format('DD-MM-YY HH:mm:ss')}</li>
                  ))} */}
            </ol>
          </div>

          {work?.fachasEncontradas && (
            <div className="trouble-data rounded shadow bg-green-400 p-1">
              <p>facha(s) Encontradas : {work?.fachasEncontradas}</p>
            </div>
          )}

          {work?.observaciones && (
            <div className="trouble-data transition duration-1000 ease-in-out rounded shadow bg-yellow-400 p-1">
              <p className="transition duration-1000 ease-in-out">
                Observaciones : <br /> {work?.observaciones.slice(0, l)}
                {work?.observaciones.length > 200 ? (
                  <span onClick={handleObservaciones1} className="ver-mas cursor-pointer text-white duration-500">
                    ...Ver Más
                  </span>
                ) : null}
                <span
                  onClick={handleObservaciones2}
                  className="ver-menos cursor-pointer text-pink-400 duration-500 hidden"
                >
                  ...Ver Menos
                </span>
              </p>
            </div>
          )}

          {work?.descripcion && (
            <div className="trouble-data rounded-md bg-pink-400 p-1">
              <p>
                descripcion : <br /> {work?.descripcion}
              </p>
            </div>
          )}

          <Link
            to={`/works/order/${workId}`}
            className="bg-gray-800 flex justify-center items-center text-white text-center shadow rounded "
          >
            GENERAR PDF
          </Link>
        </div>
      </div>

      {work?.esPatron && (
        <div className="patron grid grid-cols-2 p-2 shadow my-2">
          <div className="text-green-500 text-4xl text-center flex justify-center items-center">{work?.patron}</div>
          <div className="patron grid grid-cols-3 gap-2 my-1">
            {numeros.map((n) => (
              <button
                type="button"
                key={n}
                className={
                  work?.patron.includes(n)
                    ? 'bg-green-700  w-8 h-8 flex justify-center items-center hover:bg-green-400 duration-600 '
                    : 'bg-gray-200  w-8 h-8 flex justify-center items-center hover:bg-green-400  duration-600'
                }
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      )}
      {role !== 'user' && (
        <div className="update-state">
          <button className="bg-gray-400 hover:bg-gray-600">Presupuesto</button>
          <button className="bg-yellow-500 hover:bg-yellow-600">Terminado</button>
          <button className="bg-green-300 hover:bg-green-400">Reparación</button>
          <button className="bg-green-500 hover:bg-green-700">Entregado</button>
        </div>
      )}
    </div>
  );
};
export default GetWork;
