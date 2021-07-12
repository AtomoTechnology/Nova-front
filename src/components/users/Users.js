import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGettingAllClient } from "../../action/clientsAction";
import { SmallLoading } from "../SmallLoading";
// import { useForm } from "../../hooks/useForm";

import { User } from "./User";
import { UserSearch } from "./UserSearch";

export const Users = () => {
  const dispatch = useDispatch();
  // const [searchClient, setSearchClient] = useState("");
  const [searchClient, setSearchClient] = useState("");
  const [result, setResult] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);
  // let { searchClient } = values;
  // console.log(searchClient);

  useEffect(() => {
    dispatch(startGettingAllClient());
    setLoadingUser(false);
  }, [dispatch]);
  // let result = [];
  const { clients } = useSelector((state) => state.clients);
  useEffect(() => {
    setLoadingUser(true);
    setResult(
      clients.filter(
        (cl) =>
          cl.dni.includes(searchClient) ||
          cl.name.toLowerCase().includes(searchClient.toLowerCase())
      )
    );
    setLoadingUser(false);
  }, [searchClient]);

  // const handleChangeSearchClient = (e) => {
  //   e.preventDefault();
  //   // setSearchClient(e.target.value);
  //   if (searchClient === "") {
  //     return setResult([]);
  //   }
  //   // console.log(searchClient);
  //   // console.log(result)
  //   setResult(
  //     clients.filter(
  //       (cl) =>
  //         cl.dni.includes(searchClient) ||
  //         cl.name.toLowerCase().includes(searchClient.toLowerCase())
  //     )
  //   );
  // };
  const handleCloseBtn = () => {
    setSearchClient("");
    setResult([]);
  };

  return (
    <div className="users">
      {clients.length >= 10 && (
        <div className="box-search relative">
          <div className="search-box-userworks bg-gray-800  border-2 border-gray-200">
            {/* <i class="fas fa-search text-gray-900 bg-gray-100 p-3"></i> */}

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
              class="fas fa-times cursor-pointer duration-500 text-gray-600  right-3 bg-gray-100 hover:text-white hover:bg-red-500"
            ></i>
          </div>
        </div>
      )}

      {searchClient.length > 0 && result.length === 0 && (
        <div className="message-result-empty   bg-red-500 p-2 my-2 w-12/12 shadow-md rounded text-center">
          No hay resultado para este filtro...
        </div>
      )}

      {loadingUser ? (
        <SmallLoading />
      ) : result.length > 0 ? (
        <div className="h-12/12 bg-gray-50 users-grid">
          {result.map((clt) => (
            <User key={clt._id} client={clt} />
          ))}
        </div>
      ) : (
        <div className="h-12/12 bg-gray-50 users-grid">
          {clients.map((clt) => (
            <User key={clt._id} client={clt} />
          ))}
        </div>
      )}
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
