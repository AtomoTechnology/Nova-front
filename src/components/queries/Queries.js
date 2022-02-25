import React, { useState } from 'react';
import { useEffect } from 'react';
import { fetchWithToken } from './../../helpers/fetchWithOutToken';
import moment from 'moment';
import { showAlert } from '../alerts';
import { useSelector } from 'react-redux';
import { SmallLoading } from '../SmallLoading';
import smallNova from './../../templatePics/logoNovaSmall.png';
import userChat from './../../templatePics/userchat.png';
import Swal from 'sweetalert2';
import $ from 'jquery';

const Queries = () => {
  const [queries, setQueries] = useState([]);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [response, setResponse] = useState('');
  const [loadingResponse, setLoadingResponse] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [refreshQuery, setRefreshQuery] = useState(false);

  useEffect(() => {
    async function GetAllQueries() {
      setLoadingData(true);
      const resp = await fetchWithToken('queries');
      const data = await resp.json();
      setQueries(data.data.data);
      setLoadingData(false);
    }
    GetAllQueries();
  }, [setRefreshQuery, refreshQuery]);

  async function RefreshQuery() {
    try {
      const res = await fetchWithToken(`queries/${selectedQuery._id}`);
      const data = await res.json();
      if (data.status === 'success') {
        setSelectedQuery(data.data.data);
      }
      let resps = document.querySelector('.responses');
      resps.scrollTop = resps.scrollHeight;
    } catch (error) {
      showAlert('error', 'Error al refrescar los datos de la consulta. Intente más tarde. ❌');
    }
  }

  // setInterval(async () => {
  //   console.log('acaaaa');
  //   if (selectedQuery) {
  //     try {
  //       const res = await fetchWithToken(`queries/${selectedQuery._id}`);
  //       const data = await res.json();
  //       if (data.status === 'success') {
  //         setSelectedQuery(data.data.data);
  //       }
  //     } catch (error) {
  //       showAlert('error', 'Error al refrescar los datos de la consulta. Intente más tarde. ❌');
  //     }
  //   }
  // }, 20000);

  const { uid, role } = useSelector((state) => state.auth);

  const addResponse = async (e) => {
    setLoadingResponse(true);
    e.preventDefault();
    if (!response) return;
    const res = await fetchWithToken(`queries/${selectedQuery._id}`, { message: response.trim() }, 'PATCH');
    const data = await res.json();
    if (data.status === 'success') {
      setResponse('');
      setSelectedQuery(data.data.query);
      showAlert('success', 'respuesta agregado con exito');
      let resps = document.querySelector('.responses');
      resps.scrollTop = resps.scrollHeight;
    } else {
      showAlert('error', 'Ocurrio algun error al agregar la respuesta. Intenta más tarde por favor');
    }
    setLoadingResponse(false);
  };

  const DeleteQueryById = () => {
    Swal.fire({
      title: 'Estás seguro ?',
      text: 'Al aceptar se borrará la consulta definitivamente!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        DeleteQuery();
      }
    });
  };

  async function DeleteQuery() {
    try {
      const resp = await fetchWithToken(`queries/${selectedQuery._id}`, {}, 'DELETE');
      const data = await resp.json();
      if (data.status) {
        showAlert('success', 'Consultas borrada con exito. ✔');
        setSelectedQuery(null);
      } else {
        showAlert('error', 'Error al borrar la consulta. Intente más tarde❌');
      }
    } catch (error) {
      showAlert('error', error.message);
    }

    // setQueries(data.data.data);
  }

  const setActiveQueryAndMore = async (e, q) => {
    setSelectedQuery(q);

    if (e.view.innerWidth <= 500) {
      document.querySelector('.queries-chats').style.display = 'none';
      document.querySelector('.query-chat').style.display = 'flex';
    }

    if (!q.read) {
      const res = await fetchWithToken(`queries/${q._id}/setRead`, { read: true }, 'PUT');
      const data = await res.json();

      console.log(data, data.data.query);
      if (data.status === 'success') {
        setSelectedQuery(data.data.query);
      }
    }
    let resps = document.querySelector('.responses');
    resps.scrollTop = resps?.scrollHeight;
  };

  return (
    <div className="queries  shadow grid grid-cols-2 p-2">
      <div className="queries-chats items-center justify-start flex flex-col h-full ">
        {loadingData ? (
          <SmallLoading text="Cargando..." size="small" />
        ) : (
          queries.map((q) => (
            <div
              onClick={(e) => {
                setActiveQueryAndMore(e, q);
              }}
              key={q._id}
              className={
                'query w-full border-b border-2 p-2 flex justify-start items-center cursor-pointer gap-2 hover:bg-gray-200 bg-gray-100 ' +
                (!q.read && ' bg-gray-300 ')
              }
            >
              <div className="queryuser-logo overflow-hidden   rounded-full w-16 h-16 shadow-md border-2">
                {/* <AvatarDefault username={q.user.name} /> */}
                <img src={userChat} alt="user logo chat" />
              </div>
              <div className="query-left flex flex-col gap-2 self-end">
                <div className="query-username-date flex justify-between gap-2  items-center">
                  <span>{q.user.name}</span>
                  <span className="text-gray-600 opacity-80 italic"> {moment(q.date).format('DD-MM-yyyy')}</span>
                </div>
                <div className="query-text">{q.message.slice(0, 30)}</div>
              </div>
            </div>
          ))
        )}
        <div
          onClick={() => {
            setRefreshQuery((v) => !v);
            // setSelectedQuery(null);
          }}
          className=" rounded-full jhm-shadow flex items-center cursor-pointer justify-center my-4"
        >
          <i className="fas fa-sync-alt w-12 h-12 rounded-full jhm-shadow flex items-center duration-150 justify-center bg-green-500 hover:bg-green-600 "></i>
        </div>
      </div>
      <div className="query-chat justify-center items-center bg-gray-300 relative">
        {selectedQuery ? (
          <div className="w-full ">
            <div className="query-header  w-full sticky  top-12 border-b border-2 p-2 flex justify-between items-center cursor-pointer gap-2 hover:bg-gray-200 bg-gray-100 ">
              <div className="flex justify-between gap-2 items-center">
                <i
                  onClick={() => {
                    document.querySelector('.queries-chats').style.display = 'flex';
                    document.querySelector('.query-chat').style.display = 'none';
                  }}
                  className="fas fa-arrow-left w-8 hidden close-current-chat top-0 left-0 h-8 rounded-full jhm-shadow  items-center duration-150 justify-center bg-gray-500 hover:bg-gray-600 "
                ></i>
                <div className="queryuser-logo overflow-hidden   rounded-full w-16 h-16 shadow-md border-2">
                  {/* <AvatarDefault username={selectedQuery.user.name} /> */}
                  <img src={userChat} alt="user logo chat" />
                </div>
                <span>{selectedQuery?.user?.name}</span>
              </div>
              <div className="flex mr-2 gap-2 self-center text-white">
                <div
                  onClick={() => {
                    RefreshQuery();
                  }}
                  className="action-chat"
                >
                  <i className="fas fa-sync-alt w-8 h-8 rounded-full jhm-shadow flex items-center duration-150 justify-center bg-green-500 hover:bg-green-600 "></i>
                </div>
                {role === 'admin' && (
                  <div onClick={DeleteQueryById} className="action-chat">
                    <i className="fas fa-trash w-8 h-8 rounded-full jhm-shadow flex items-center duration-150 justify-center  bg-red-500 hover:bg-red-600 "></i>
                  </div>
                )}

                {/* <div className="action-chat">
                  <i className="fas fa-sync-alt w-8 h-8 rounded-full jhm-shadow flex items-center duration-150 justify-center bg-green-500 hover:bg-green-600 "></i>
                </div> */}
              </div>
            </div>
            <div className="responses my-4">
              {selectedQuery?.responses.length > 0 ? (
                selectedQuery?.responses?.map((res) => (
                  <div
                    key={res._id}
                    className={
                      'response-query flex rounded-md my-3 mx-2  ' + (uid === res.user ? 'myresponse' : 'theyresponse')
                    }
                  >
                    {/* <div className="relative">
                      <i
                        onClick={() => {
                          // document.querySelectorAll('.action-query-response').classList.toggle('hidden');
                          $('.dots-action').click(function () {
                            if ($(this).siblings().hasClass('hidden')) {
                              console.log('has');
                              $(this).siblings().removeClass('hidden');
                            } else {
                              console.log('dont has');
                              $(this).siblings().addClass('hidden');
                            }
                            // $('.action-query-response').addClass('hidden');
                            console.log($(this).siblings());
                            // console.log($('.action-query-response'));
                          });
                        }}
                        className="fas fa-ellipsis-v dots-action text-lg mr-2 cursor-pointer text-gray-800"
                      ></i>
                      <div className=" action-query-response text-white absolute hidden z-10  top-8 left-0 rounded-sm bg-white p-1 flex flex-col items-center justify-center gap-2 ">
                        <div onClick={DeleteQueryById} className="action-chat">
                          <i className="fas fa-trash w-8 h-8 rounded-full jhm-shadow flex items-center duration-150 justify-center  bg-red-500 hover:bg-red-600 "></i>
                        </div>
                      </div>
                    </div> */}
                    <span
                      className={
                        'p-2 shadow flex relative flex-col ' +
                        (uid === res.user ? 'myresponse-text' : 'theyresponse-text')
                      }
                    >
                      <span>{res.message}</span>
                      <span className=" self-end  p-1 text-xs ">
                        {' '}
                        {moment(res.date).format(
                          `${
                            moment().format('DD-MM-YYYY') === moment(res.date).format('DD-MM-YYYY')
                              ? 'HH:mm'
                              : 'DD-MM-YYYY | HH:mm'
                          }   `
                        )}{' '}
                      </span>
                    </span>

                    {/* <div className="queryuser-logo overflow-hidden   rounded-full w-16 h-16 shadow-md border-2">
                    <AvatarDefault username={selectedQuery.user.name} />
                  </div> */}
                    {/* <div className="query-username-date flex flex-col  gap-2  items-center"> */}
                    {/* <span>{selectedQuery.user.name}</span> */}
                    {/* <span> {moment(selectedQuery.date).format('DD-MM-yyyy HH:mm:ss')}</span> */}
                    {/* </div> */}
                  </div>
                ))
              ) : (
                <div className="h-full w-full flex items-center flex-col gap-4 justify-center">
                  <i className="far fa-smile-wink text-4xl text-red-500"></i>
                  <span className="w-10/12">
                    Todavia no hay respuesta . Si ya tenia el navegador abierto actualiza con el boton verde de arriba
                    por favor o refresca la pagina.
                  </span>
                </div>
              )}
            </div>
            <div className="w-full sticky bottom-0">
              <form onSubmit={addResponse} className="form-response flex ">
                <input
                  type="text"
                  className="bg-gray-700 text-white"
                  name="response"
                  placeholder="escribe una respuesta"
                  value={response}
                  onChange={(e) => {
                    setResponse(e.target.value);
                  }}
                />
                {loadingResponse ? (
                  <SmallLoading text="" size="btn" />
                ) : (
                  <button disabled={!response} className="btn-send-response bg-red-500 hover:bg-red-700 p-3">
                    <i className="fas fa-paper-plane"></i>
                  </button>
                )}
              </form>
            </div>
          </div>
        ) : (
          <div className="flex justify-center  flex-col gap-4 items-center h-full p-1 ">
            <i className="far fa-smile-wink text-4xl text-red-500"></i>
            <span className="text-gray-800 opacity-90 text-center ">Seleccionar un chat para ver los mensajes</span>
            <img width={250} src={smallNova} alt="LoGo NOVA " />
          </div>
        )}
      </div>
    </div>
  );
};
export default Queries;
