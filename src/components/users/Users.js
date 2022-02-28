import { useEffect, useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startGettingAllClient } from '../../action/clientsAction';
import { fetchWithToken } from '../../helpers/fetchWithOutToken';
import { SmallLoading } from '../SmallLoading';
import { AvatarDefault } from './AvatarDefault';
import { User } from './User';

const Users = () => {
  // const dispatch = useDispatch();
  // const [searchClient, setSearchClient] = useState("");
  // const [searchClient, setSearchClient] = useState('');
  // const [result, setResult] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const observer = useRef();
  // const [quant, setQuant] = useState(15);
  const [actualPage, setActualPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [allUsers, setAllUsers] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [a, setA] = useState([1, 2, 3]);

  useEffect(() => {
    GetAll();
  }, [actualPage, setActualPage, limit]);

  const GetAll = async () => {
    setLoadingUser(true);
    console.log('getting data');
    const resp = await fetchWithToken(`users?page=${actualPage}&limit=${limit}`);
    const body = await resp.json();
    if (body.status === 'success') {
      setTotalPage(body.totalPage);
      console.log(body);
      // body.data.users.map((user) => setAllUsers((p) => [...p, user]));
      setAllUsers((p) => [...p, ...body.data.users]);
    }
    // await dispatch(startGettingAllClient(actualPage, limit));
    setLoadingUser(false);
  };
  // const { clients, page, totalPage } = useSelector((state) => state.clients);

  // let result = [];

  const lastUser = useCallback(
    (node) => {
      console.log('last:', node);
      if (loadingUser) return;
      //   console.log('ahter loading');
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && actualPage < totalPage) {
          console.log('agregando 1 mas...');
          setActualPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loadingUser, actualPage, setActualPage]
  );

  // console.log(actualPage, page, totalPage);
  // let { searchClient } = values;
  console.log(allUsers, allUsers.length);

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

  // : result.length > 0 ? (
  //       <div className="h-12/12 bg-gray-50 users-grid">
  //         {result.map((clt, index) => {
  //           if (result.length === index + 1) {
  //             return <User ref={lastUser} key={clt._id} client={clt} />;
  //           } else {
  //             return <User key={clt._id} client={clt} />;
  //           }
  //         })}
  //       </div>
  //     )

  return (
    <div className="users">
      {/* <button
        onClick={() => {
          setA((ant) => [...ant, 9]);
          console.log(a);
        }}
      >
        add
      </button> */}
      {/* <span className="title-header">Clientes</span> */}
      {/* <div className="add-client-flotante">
        <Link to="/client/add">
          <i className="fas fa-plus-circle"></i>
        </Link>
      </div> */}
      {/* {clients.length >= 10 && (
        <div className="box-search relative">
          <div className="users-filter hidden">
            <h3>FIltro de Cliente</h3>
            <span>Buscar Cliente por nombre y/o DNI</span>
          </div>
          <div className="search-box-userworks bg-gray-800 ">
            <i className="fas fa-search text-gray-900 bg-gray-100 p-3"></i>

            <form className="w-full">
              <input
                value={searchClient}
                onChange={(e) => setSearchClient(e.target.value)}
                placeholder={`Buscar cliente por nombre o dni...`}
                name="searchClient"
                type="text"
                autoComplete="off"
                className="text-gray-900"
                id="searchClientInput"
              />
            </form>
            <i
              onClick={handleCloseBtn}
              className="fas fa-times cursor-pointer duration-500 text-gray-600  right-3 bg-gray-100 hover:text-white hover:bg-red-500"
            ></i>
          </div>
        </div>
      )} */}

      {/* {searchClient.length > 0 && result.length === 0 && (
        <div className="message-result-empty   bg-red-500 p-2 my-2 w-12/12 shadow-md rounded text-center">
          No hay resultado para este filtro...
        </div>
      )} */}

      <div className="h-12/12 bg-gray-50 users-grid">
        {allUsers.map((client, index) => {
          if (allUsers.length === index + 1) {
            return (
              <Link key={index} ref={lastUser} to={`clients/${client._id}`} className="user lastttt">
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

      {loadingUser && <SmallLoading />}
      {/* //  : (
        //   <div className="no-cliente">
        //     <span className="text-center text-2xl">No hay cliente por el momento</span>

        //     <Link to="/client/add" className="btn add-client text-white p-3">
        //       Agregar Cliente
        //     </Link>
        //   </div>
        // ) */}

      {/* {loadingUser ? (
        <SmallLoading />
      ) : (
        <div className="h-12/12 bg-gray-50 users-grid">
          {clients.length > 0
            ? clients.map((clt) => <User key={clt._id} client={clt} />)
            : null}
        </div>
      )} */}
    </div>
  );
};

export default Users;
