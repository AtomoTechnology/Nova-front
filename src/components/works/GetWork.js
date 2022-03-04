import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteWork, getOneWork, startEditWork } from '../../action/worksAction';
import { Link } from 'react-router-dom';
import userLogo from '../../templatePics/userLogo.png';
import moment from 'moment';
import { GetStates } from '../../helpers/getStates';
import Swal from 'sweetalert2';
import { SmallLoading } from '../SmallLoading';
import GetOneWork from '../preViews/GetOneWork';

const GetWork = ({ match, history }) => {
  const dispatch = useDispatch();
  const [l, setL] = useState(200);
  const { role } = useSelector((state) => state.auth);
  const [estados, setEstados] = useState([]);
  const [reload, setReload] = useState(false);
  const [loadingUpdateState, setLoadingUpdateState] = useState(false);
  const [loadingOneWork, setLoadingOneWork] = useState(true);
  const workId = match.params.workId;

  useEffect(() => {
    setLoadingOneWork(true);
    async function GetOne(id) {
      await dispatch(getOneWork(id));
      setLoadingOneWork(false);
    }
    GetOne(workId);
  }, [dispatch, workId, reload, setReload]);

  useEffect(() => {
    async function GetAllState() {
      const states = await GetStates();
      setEstados(states.data.states);
    }

    GetAllState();
  }, [setEstados]);

  const { work } = useSelector((state) => state.works);
  const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(DeleteWork(workId));
        history.push('/works');
      }
    });
  };
  const UpdateWorkState = async (e, id) => {
    setLoadingUpdateState(true);
    await dispatch(startEditWork({ estado: id }, workId, true));
    setReload(!reload);
    setLoadingUpdateState(false);
  };

  return (
    <div className="one-work relative">
      {loadingOneWork ? (
        <GetOneWork />
      ) : (
        <>
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
            {/* <i className={' fas fa-mobile-alt flex justify-center items-center ' + color}></i> */}
            <div className="one-work-body flex justify-center flex-wrap mt-12 gap-2">
              <div className="work-data shadow rounded bg-gray-700 text-white p-1">
                <p>Codigo : {work?.codigo} </p>
                <p>Marca : {work?.marca} </p>
                <p>Modelo : {work?.modelo}</p>
                <p>Imei : {work?.emei}</p>
                <p>
                  Estado:
                  {work?.estado.name}
                </p>
                {work?.tieneContrasena && <p>Contraseña : {work.contrasena ? work.contrasena : work.patron}</p>}
              </div>
              {work?.cliente ? (
                <div className="client-data rounded shadow bg-pink-500 p-1">
                  <img className="rounded-full h-12 w-12" src={userLogo} alt="logo user" />
                  <p>
                    Cliente :
                    <Link className="underline text-white" to={`/clients/${work?.cliente?._id}`}>
                      {work?.cliente?.name}
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

              {work?.fachasEncontradas && (
                <div className="trouble-data rounded shadow bg-green-400 p-1">
                  <p>
                    Falla(s) Encontradas : <br /> {work?.fachasEncontradas}
                  </p>
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
              <div className="price-data rounded shadow bg-red-400 p-1">
                <span className="text-white text-lg underline">Historiales de Estados </span>
                <ol>
                  {work?.states.map((stw, index) => (
                    <li key={index}>{stw.nombre + ' - ' + moment(stw.fecha).format('DD-MM-YY HH:mm:ss')}</li>
                  ))}
                </ol>
              </div>

              <Link
                style={{
                  height: '3rem!important',
                  minHeight: '3rem!important',
                }}
                to={`/works/order/${workId}`}
                className="bg-gray-800 !min-h-12 !h-12 trouble-data flex justify-center items-center text-white text-center shadow rounded "
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
              {estados.map((est) => (
                <button
                  key={est._id}
                  disabled={loadingUpdateState}
                  onClick={(e) => {
                    UpdateWorkState(e, est._id);
                  }}
                  className={'btn-' + est.name}
                >
                  {loadingUpdateState ? <SmallLoading text="" size="small" /> : est.name}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default GetWork;
