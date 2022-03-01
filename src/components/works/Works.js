import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { DeleteWork, getAllWorks } from '../../action/worksAction';
import { useForm } from '../../hooks/useForm';
import { SmallLoading } from '../SmallLoading';
import { Work } from './Work';
import $ from 'jquery';
import { useCallback } from 'react';
import userLogo from '../../templatePics/userLogo.png';
import Swal from 'sweetalert2';
import { fetchWithToken } from '../../helpers/fetchWithOutToken';

const Works = ({ history }) => {
  const dispatch = useDispatch();

  const [values, handleInputChange] = useForm({ estado: '' });
  const { estado } = values;
  const [codigo, setCodigo] = useState('');
  const [loadingWorks, setLoadingWorks] = useState(true);
  const [result, setResult] = useState([]);
  const [limit, setLimit] = useState(30);
  const [actualPage, setPage] = useState(1);
  const filterBox = useRef();
  const observer = useRef();
  const [workss, setWorkss] = useState([]);
  const [total, setTotal] = useState(1);
  const { role } = useSelector((state) => state.auth);
  // const { works, total } = useSelector((state) => state.works);

  useEffect(() => {
    GetAll();
  }, [actualPage, setPage, limit]);

  const GetAll = async () => {
    setLoadingWorks(true);
    const resp = await fetchWithToken(`works?page=${actualPage}&limit=${limit}`);
    const body = await resp.json();
    if (body.status === 'success') {
      console.log(body);
      setTotal(body.total);
      setWorkss((prev) => [...prev, ...body.data.works]);
    }
    // await dispatch(getAllWorks(limit, actualPage));
    setResult([]);
    setLoadingWorks(false);
  };
  const lastWork = useCallback(
    (node) => {
      if (loadingWorks) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && workss.length < total) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loadingWorks, actualPage, setPage]
  );
  // useEffect(() => {
  //   if (estado === 'Todos' || estado === '') {
  //     setResult(works);
  //   } else {
  //     setResult(works.filter((w) => w.estado.name === estado));
  //   }
  // }, [estado]);

  // useEffect(() => {
  //   if (codigo !== '') {
  //     setResult(works.filter((w) => w.codigo.includes(codigo)));
  //   } else {
  //     setResult([]);
  //   }
  // }, [codigo]);

  const stateArray = ['Revision', 'Presupuesto', 'En Reparacion', 'Terminado', 'Entregado', 'Todos'];
  const toggleFilterBox = () => {
    $('.toggle-filter').toggleClass('hidden');
  };
  // let arrayPage = [];
  // for (let i = 1; i <= page; i++) {
  //   arrayPage.push(i);
  // }
  const DeleteWorkById = (idWork) => {
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
        dispatch(DeleteWork(idWork));
        history.push('/works');
      }
    });
  };

  const toogleHeaderAction = (e) => {
    const all = document.querySelectorAll('.header-action');
    all.forEach((el) => {
      if (el !== e.target.parentElement) el.classList.remove('active');
    });
  };

  return (
    <div className="works ">
      <div className="limit-total-results search-box-all-works">
        <div>
          <span className="text-white">Filtrar</span>
          <i
            onClick={toggleFilterBox}
            className="fas fa-sliders-h m-2 sticky text-white cursor-pointer   top-12 hover:bg-gray-800 p-2"
          ></i>
        </div>

        {/* <span className="total-results bg-white shadow text-gray-900 p-1">
          {results} / {total}
        </span> */}

        {/* <div className="page-filter flex items-center">
          <label className="text-red-700 ">Page :</label>
          <input
            type="text"
            placeholder="pagina"
            className="w-8 h-8  bg-white "
            onChange={(e) => {
              setPage(e.target.value);
            }}
            value={actualPage}
          />
          <div className="note-page-filter flex text-center justify-center curso-pointer  items-center border-l border-t-0 border-r-0 border-gray-800  bg-white rounde note w-8 h-8">
            <i>?</i>
            <span className="absolute shadow-md bg-white p-1 top-0 left-7 hidden  ">
              Indica la pagina que quieres acceder
            </span>
          </div>
          <i className="fas fa-filter w-8 h-8 rounded-full shadow flex items-center justify-center bg-red-700 text-white cursor-pointer hover:bg-red-800 hover:shadow-md "></i>
        </div> */}
        <div ref={filterBox} className="toggle-filter hidden">
          <div className="overflow-hidden  my-1 ">
            <form className="flex w-full flex-wrap lg:justify-center gap-y-2 flex-col sm:flex-row md:justify-between items-center sm:gap-x-2">
              <select className=" shadow  sm:w-min w-full" name="estado" onChange={handleInputChange} value={estado}>
                <option value="" disabled>
                  Filtrar por estado
                </option>
                {stateArray.map((elem) => (
                  <option key={elem} value={elem}>
                    {elem}
                  </option>
                ))}
              </select>
              <input
                name="codigo"
                className="shadow   sm:w-min w-full"
                value={codigo}
                onChange={(e) => {
                  setCodigo(e.target.value);
                }}
                placeholder="Buscar codigo de trabajo"
                type="text"
              />
            </form>
          </div>
        </div>
      </div>

      <div className="add-client-flotante">
        <Link to="/work/add">
          <i className="fas fa-plus-circle"></i>
        </Link>
      </div>
      {/* 
      {result.length === 0 && (
        <div className="message-result-empty hidden  bg-red-500 text-gray-100 p-2 my-2 w-12/12 shadow-md rounded text-center">
          No hay resultado para este filtro...
        </div>
      )} */}

      <div className="works-grid p-1 m-auto">
        {workss.map((work, index) => {
          let color = '';
          // console.log(history);
          switch (work.estado.name) {
            case 'Revision':
              color = 'red-700';
              break;
            case 'Presupuesto':
              color = 'gray-600';
              break;
            case 'En Reparacion':
              color = 'yellow-500';
              break;
            case 'Terminado':
              color = 'pink-400';
              break;
            default:
              color = 'green-700';
              break;
          }
          if (workss.length === index + 1) {
            return (
              <div key={index} ref={lastWork} className="work">
                <div className="cliente-precio flex justify-between bg-gray-100  p-1 items-center">
                  {work?.cliente?.pathImg ? (
                    <img
                      className="rounded-full w-8 border-1 border-pink-500 h-8"
                      src={`/assets/img/client/${work?.cliente?.pathImg}`}
                    />
                  ) : (
                    <img className="rounded-full w-8 border-1 border-pink-500 h-8" src={userLogo} />
                  )}

                  <h3 className="capitalize font-serif">{work?.cliente?.name}</h3>
                  {role == 'admin' && (
                    <div className="header-action  relative">
                      <i
                        onClick={toogleHeaderAction}
                        className="fas fa-ellipsis-v rounded cursor-pointer w-8 h-8 shadow bg-gray-100  flex justify-center items-center hover:shadow-md hover:rounded-full hover:bg-blue-100"
                      ></i>
                      <div className="hidden absolute flex justify-center gap-2 items-center right-0 p-1 bg-gray-100  shadow  ">
                        <span className="w-8 h-8 rounded-full cursor-pointer hover:shadow-md hover:text-red-500  text-red-700  shadow p-1 flex justify-center items-center text-center bg-white">
                          <i className="fas fa-trash " onClick={() => DeleteWorkById(work?._id)}></i>
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                <Link to={`/works/${work._id}`} className="title p-1">
                  <span className={'capitalize text-' + color}>
                    {work?.marca + ' - ' + work?.modelo}
                    {work?.tieneContrasena && <i className="fas fa-lock work-lock"></i>}
                  </span>
                </Link>
                <div className="observaciones p-1">
                  <span>
                    {work?.observaciones.slice(0, 60)} {work?.observaciones.length > 60 ? '...' : null}
                  </span>
                </div>
                <div className="p-1">{work?.tieneContrasena ? work?.contrasena : null}</div>

                <div className="estado p-1 flex justify-between items-center">
                  <span className={`rounded-sm text-white bg-${color} p-1`}>{work?.estado.name}</span>
                  <i className={' fas fa-mobile-alt mr-4 text-' + color}></i>
                </div>
              </div>
            );
          } else {
            return (
              <div key={index} className="work">
                <div className="cliente-precio flex justify-between bg-gray-100  p-1 items-center">
                  {work?.cliente?.pathImg ? (
                    <img
                      className="rounded-full w-8 border-1 border-pink-500 h-8"
                      src={`/assets/img/client/${work?.cliente?.pathImg}`}
                    />
                  ) : (
                    <img className="rounded-full w-8 border-1 border-pink-500 h-8" src={userLogo} />
                  )}

                  <h3 className="capitalize font-serif">{work?.cliente?.name}</h3>
                  {role == 'admin' && (
                    <div className="header-action  relative">
                      <i
                        onClick={toogleHeaderAction}
                        className="fas fa-ellipsis-v rounded cursor-pointer w-8 h-8 shadow bg-gray-100  flex justify-center items-center hover:shadow-md hover:rounded-full hover:bg-blue-100"
                      ></i>
                      <div className="hidden absolute flex justify-center gap-2 items-center right-0 p-1 bg-gray-100  shadow  ">
                        <span className="w-8 h-8 rounded-full cursor-pointer hover:shadow-md hover:text-red-500  text-red-700  shadow p-1 flex justify-center items-center text-center bg-white">
                          <i className="fas fa-trash " onClick={() => DeleteWorkById(work?._id)}></i>
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                <Link to={`/works/${work._id}`} className="title p-1">
                  <span className={'capitalize text-' + color}>
                    {work?.marca + ' - ' + work?.modelo}
                    {work?.tieneContrasena && <i className="fas fa-lock work-lock"></i>}
                  </span>
                </Link>
                <div className="observaciones p-1">
                  <span>
                    {work?.observaciones.slice(0, 60)} {work?.observaciones.length > 60 ? '...' : null}
                  </span>
                </div>
                <div className="p-1">{work?.tieneContrasena ? work?.contrasena : null}</div>

                <div className="estado p-1 flex justify-between items-center">
                  <span className={`rounded-sm text-white bg-${color} p-1`}>{work?.estado.name}</span>
                  <i className={' fas fa-mobile-alt mr-4 text-' + color}></i>
                </div>
              </div>
            );
          }
        })}
      </div>

      {loadingWorks && <SmallLoading />}
    </div>
  );
};
export default Works;
