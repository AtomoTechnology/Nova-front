import { useEffect, useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { fetchWithToken } from '../../helpers/fetchWithOutToken';
import UsersPreview from '../preViews/UsersPreview';
import { SmallLoading } from '../SmallLoading';
import { AvatarDefault } from './AvatarDefault';
import { User } from './User';

const Users = () => {
  // const dispatch = useDispatch();
  // const [searchClient, setSearchClient] = useState("");
  // const [result, setResult] = useState([]);
  // const [quant, setQuant] = useState(15);
  const [searchClient, setSearchClient] = useState('');
  const [loadingUser, setLoadingUser] = useState(true);
  const observer = useRef();
  const [actualPage, setActualPage] = useState(1);
  const [limit] = useState(30);
  const [allUsers, setAllUsers] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [searchUsers, setSearchUsers] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [errorSearch, setErrorSearch] = useState(false);
  const search = useRef();
  useEffect(() => {
    GetAll();
  }, [actualPage, setActualPage, limit]);

  const GetAll = async () => {
    setLoadingUser(true);
    const resp = await fetchWithToken(`users?page=${actualPage}&limit=${limit}`);
    const body = await resp.json();
    if (body.status === 'success') {
      setTotalPage(body.totalPage);
      setAllUsers((p) => [...p, ...body.data.users]);
    }
    setLoadingUser(false);
  };

  const lastUser = useCallback(
    (node) => {
      if (loadingUser) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && actualPage < totalPage) {
          setActualPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loadingUser, actualPage, setActualPage]
  );

  // useEffect(() => {
  //   setLoadingUser(true);
  //   setResult(
  //     clients.filter(
  //       (cl) => cl.dni.includes(searchClient) || cl.name.toLowerCase().includes(searchClient.toLowerCase())
  //     )
  //   );
  //   setLoadingUser(false);
  // }, [searchClient, clients]);

  const handleCloseBtn = () => {
    // setSearchClient('');
    // setResult([]);
  };

  const SearchUserByNameOrDNI = async (e) => {
    e.preventDefault();
    if (!search.current.value) {
      setSearchUsers([]);
      setErrorSearch(true);
      return;
    } else {
      setAllUsers([]);
      setErrorSearch(false);
      setLoadingSearch(true);
      const resp = await fetchWithToken(`users/search/${search.current.value}`);
      const body = await resp.json();
      if (body.status === 'success') {
        setSearchUsers(body.data.users);
      }
      setLoadingSearch(false);
    }
  };
  const ClearFilter = () => {
    search.current.value = '';
    setSearchUsers([]);
    if (actualPage === 1) {
      GetAll();
    } else {
      setActualPage(1);
    }
  };

  return (
    <div className="users">
      <div className="add-client-flotante">
        <Link to="/client/add">
          <i className="fas fa-plus-circle"></i>
        </Link>
      </div>
      <div className="box-search relative">
        <div className="users-filter hidden">
          <h3>FIltro de Cliente</h3>
          <span>Buscar Cliente por nombre y/o DNI</span>
        </div>
        <div className="shadow-md sm:w-11/12 m-auto  ">
          <form onSubmit={SearchUserByNameOrDNI} className="w-full">
            <fieldset className="flex !flex-row !gap-0 ">
              <input
                ref={search}
                placeholder={`Buscar cliente por nombre o dni...`}
                name="search"
                type="text"
                style={{ borderRadius: '0px' }}
                autoComplete="off"
                className="text-gray-900 !rounded-0"
                id="searchClientInput"
              />
              {(searchUsers.length > 0 || allUsers.length === 0) && (
                <button onClick={ClearFilter} type="button" className="btn bg-gray-800">
                  X
                </button>
              )}

              <button type="sumbit" className="btn bg-red-500">
                Buscar
              </button>
            </fieldset>
            {errorSearch && <span className="text-red-500 text-center p-1">Ingrese un valor para buscar</span>}
          </form>
        </div>
      </div>

      {loadingSearch && <SmallLoading />}
      {searchUsers.length > 0 ? (
        <div className="h-12/12  users-grid mb-2">
          <div className="title-form !mb-0 p-4 sm:hidden">Resultados({searchUsers.length})</div>
          {searchUsers.map((client, index) => (
            <User client={client} key={index} />
          ))}
          <div className="title-form !mb-0 p-4">Fin busqueda</div>
        </div>
      ) : (
        allUsers.length === 0 &&
        loadingUser === false &&
        loadingSearch === false && <div className="title-form !mb-0 p-4">No hay resultados para ese filtro!</div>
      )}

      <div className="h-12/12 md:w-11/12 m-auto users-grid">
        {allUsers.map((client, index) => {
          if (allUsers.length === index + 1) {
            return (
              <Link key={index} ref={lastUser} to={`clients/${client._id}`} className="user">
                <div className="img-user sm:bg-blue-600 ">
                  {client?.photo ? (
                    <img
                      className="rounded-full  sm:mt-12  w-24 h-24 shadow-lg"
                      src={client?.photo}
                      alt={client?.name}
                    />
                  ) : (
                    <AvatarDefault username={client?.name} />
                  )}
                </div>
                <hr />
                <div className="user-info mt-8">
                  <h4 className="capitalize">{client.name}</h4>
                  <h4 className="capitalize">{client.dni}</h4>
                </div>
              </Link>
            );
          } else {
            return (
              <Link key={index} to={`clients/${client._id}`} className="user">
                <div className="img-user sm:bg-blue-600 ">
                  {client?.photo ? (
                    <img
                      className="rounded-full  sm:mt-12  w-24 h-24 shadow-lg"
                      src={client?.photo}
                      alt={client?.name}
                    />
                  ) : (
                    <AvatarDefault username={client?.name} />
                  )}
                </div>
                <hr />
                <div className="user-info mt-8">
                  <h4 className="capitalize">{client.name}</h4>
                  <h4 className="capitalize">{client.dni}</h4>
                </div>
              </Link>
            );
          }
        })}
      </div>
      {loadingUser && (
        // <div className="h-12/12 md:w-11/12 m-auto users-grid">
        <UsersPreview />
        // </div>
      )}
    </div>
  );
};

export default Users;
