import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllWorks } from '../../action/worksAction';
import { fetchWithToken } from '../../helpers/fetchWithOutToken';
import { useForm } from '../../hooks/useForm';
import { SmallLoading } from '../SmallLoading';
import { Work } from './Work';

export const Works = ({ history }) => {
  const dispatch = useDispatch();

  const [values, handleInputChange] = useForm({ estado: '' });
  const { estado } = values;
  const [codigo, setCodigo] = useState('');
  const [loadingWorks, setLoadingWorks] = useState(true);
  const [result, setResult] = useState([]);
  const [idChange, setIdChange] = useState(null);
  const [limit, setLimit] = useState(50);
  const [actualPage, setPage] = useState(1);
  const [allWork, setAllWork] = useState([]);
  //   const [works, setWorks] = useState([]);
  // const LoadWorks = () => {
  //   console.log(limit, actualPage);
  //   setPage(actualPage + 1);
  //   setLoadingWorks(true);
  // };

  useEffect(async () => {
    // setLoadingWorks(true);
    dispatch(getAllWorks(limit, actualPage));
    // const works = await fetchWithToken(`works`);
    // const body = await works.json();
    // setAllWork(body.data.works);
    setResult([]);

    setLoadingWorks(false);
  }, [dispatch, limit, actualPage, setLoadingWorks, loadingWorks]);
  const { works, total, page, results } = useSelector((state) => state.works);

  useEffect(() => {
    if (estado === 'Todos' || estado === '') {
      setResult(works);
    } else {
      setResult(works.filter((w) => w.estado.name === estado));
    }
  }, [estado]);

  console.log(result, works);
  useEffect(() => {
    // setResult(works);
    if (codigo !== '') {
      setResult(works.filter((w) => w.codigo.includes(codigo)));
    } else {
      setResult([]);
    }
  }, [codigo]);
  const stateArray = [
    'Revision',
    'Presupuesto',
    'En Reparacion',
    'Terminado',
    'Entregado',
    'Todos',
  ];

  let arrayPage = [];
  for (let i = 1; i <= page; i++) {
    arrayPage.push(i);
  }

  return (
    <div className="works ">
      {/* <span className="title-header"> Trabajos</span> */}
      <div className="limit-total-results search-box-all-works">
        <span className="total-results bg-white shadow text-gray-900 p-1">
          {results} / {total}
        </span>

        <div className="page-filter flex items-center">
          {/* <label className="text-red-700 ">Page :</label> */}
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
          {/* <i class="fas fa-filter w-8 h-8 rounded-full shadow flex items-center justify-center bg-red-700 text-white cursor-pointer hover:bg-red-800 hover:shadow-md "></i> */}
        </div>

        <div className="overflow-hidden  my-1 ">
          <form className="flex w-full flex-wrap lg:justify-center gap-y-2 flex-col sm:flex-row md:justify-between items-center sm:gap-x-2">
            <select
              className=" shadow  sm:w-min w-full"
              name="estado"
              onChange={handleInputChange}
              value={estado}
            >
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

        <div className="limit-box">
          <span>Limit</span>
          <select
            className=""
            name="limit"
            onChange={(e) => {
              setLimit(e.target.value);
              setPage(1);
            }}
            value={limit}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>
      <div className="add-client-flotante">
        <Link to="/work/add">
          <i class="fas fa-plus-circle"></i>
        </Link>
      </div>

      {result.length === 0 && (
        <div className="message-result-empty hidden  bg-red-500 text-gray-100 p-2 my-2 w-12/12 shadow-md rounded text-center">
          No hay resultado para este filtro...
        </div>
      )}
      {loadingWorks ? (
        <SmallLoading />
      ) : (
        <div className="works-grid p-1">
          {result.length <= 0
            ? works.map((work) => <Work history={history} key={work._id} work={work} />)
            : result.map((work) => (
                <Work idChange={idChange} setIdChange={setIdChange} key={work._id} work={work} />
              ))}
        </div>
      )}
      {/* <div className="load-works-box">
        <button className="loead-works mt-2 capitalize w-75" onClick={LoadWorks}>
          Ver mas
        </button>
        <button className="loead-works mt-2 capitalize w-75" onClick={LoadWorks}>
          Ver mas
        </button>
      </div> */}

      <div className="pagination">
        <ul className="pagination-list">
          <li
            onClick={() => {
              if (actualPage > 0) setPage(actualPage - 1);
            }}
            className="pagination-item-previous cursor-pointer mr-2 hover:text-green-700"
          >
            <i class="fas fa-angle-left p-2 rounded-full shadow w-8 h-8 text-2xl text-white flex items-center bg-blue-600 hover:shadow-md hover:bg-red-700 "></i>
          </li>

          {[1, 2, 3, 4].map((el) => (
            <li className="pagination-item" key={el} onClick={() => setPage(el)}>
              {el}
            </li>
          ))}

          <li>...</li>
          <li
            className="pagination-item"
            key={Math.ceil(arrayPage[arrayPage.length - 1] / 2)}
            onClick={() => setPage(Math.ceil(arrayPage[arrayPage.length - 1] / 2))}
          >
            {Math.ceil(arrayPage[arrayPage.length - 1] / 2)}
          </li>

          <li>...</li>

          <li
            className="pagination-item"
            key={arrayPage[arrayPage.length - 1]}
            onClick={() => setPage(arrayPage[arrayPage.length - 1])}
          >
            {arrayPage[arrayPage.length - 1]}
          </li>

          <li
            onClick={() => {
              if (actualPage < page) setPage(actualPage + 1);
            }}
            className="pagination-item-next cursor-pointer ml-2 hover:text-pink-700"
          >
            <i class="fas fa-angle-right  p-2 rounded-full shadow w-8 h-8 text-2xl text-white flex items-center bg-blue-600 hover:shadow-md hover:bg-red-700"></i>
          </li>
        </ul>
      </div>
    </div>
  );
};
