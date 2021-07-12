import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Work } from "../works/Work";
import moment from "moment";
import {
  getWorksClient,
  startGettingOneClient,
} from "../../action/clientsAction";
import { useForm } from "../../hooks/useForm";
import { SmallLoading } from "../SmallLoading";
import { Link } from "react-router-dom";
export const GetUser = ({ match }) => {
  const clientId = match.params.clientId;
  const [errores, setErrores] = useState([]);
  const [loadingWorkUser, setLoadingWorkUser] = useState(true);
  // const [searchvalue, setSearchvalue] = useState("");
  // const [ok, setOk] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startGettingOneClient(clientId));
  }, [dispatch]);

  const { client } = useSelector((state) => state.clients);
  const { role } = useSelector((state) => state.auth);
  console.log(client);
  useEffect(() => {
    dispatch(getWorksClient(client?._id));
    setLoadingWorkUser(false);
  }, [dispatch, client?._id]);
  // console.log(client);
  // const { name } = client;

  const [values, handleInputChange, reset] = useForm({
    name: client?.name,
    dni: client?.dni,
    phone1: client?.phone1,
    phone2: client?.phone2,
    direction: client?.direction,
  });
  console.log(values);
  const { name, dni, phone1, phone2, direction } = values;

  // form manage
  // do the login method
  const handleCreateClient = async (e) => {
    e.preventDefault();
    if (verifyForm()) {
      // dispatch(startCreatingClient(values, file));
      // reset();
      // setTimeout(() => {
      //   history.push("/clients");
      // }, 1000);
    } else {
      console.log(errores);
    }
  };
  // varify the form values
  const verifyForm = () => {
    let ok = true;
    let errors = [];

    if (!name || name.trim().length === 0) {
      ok = false;
      errors.name = true;
    }
    if (!direction || direction.trim().length === 0) {
      ok = false;
      errors.direction = true;
    }
    if (!dni || dni.length < 8 || dni.length > 8) {
      ok = false;
      errors.dni = true;
    }
    if (!phone1 || phone1.length < 7) {
      ok = false;
      errors.phone1 = true;
    }
    setErrores(errors);
    if (ok) {
      return true;
    } else {
      return false;
    }
  };

  // console.log("cliente", client);

  // useEffect(() => {
  //   dispatch(getWorksClient(client?.dni, client));
  // }, [dispatch]);

  let { clientWorks } = useSelector((state) => state.clients);

  const showModalClient = () => {
    document.querySelector(".modal-client-img").classList.toggle("hidden");
  };

  // const searchworksClient = (e) => {
  //   e.preventDefault();
  //   setSearchvalue(e.target.value);
  //   clientWorks = clientWorks.filter((clw) =>
  //     clw.cliente.includes(searchvalue)
  //   );

  //   setOk(true);

  //   console.log(clientWorks);
  //   // setTimeout(() => {
  //   // }, 1000);
  // };

  // const { works } = useSelector((state) => state.works);
  // console.log(clientWorks);
  return (
    <div className="userBox">
      <div className="user-header">
        <div className="one-user">
          <div onClick={showModalClient} className="shadow-md cursor-pointer">
            {client?.pathImg ? (
              <img
                className="w-32 h-32 "
                src={`/assets/img/client/${client?.pathImg}`}
                alt={client?.name}
              />
            ) : (
              <img
                src={"/assets/img/userLogo.png"}
                className="rounded-full h-full w-full"
              />
            )}
          </div>
          <div className="user-info">
            <h4>Nombre : {client?.name}</h4>
            <h4>DNI : {client?.dni}</h4>
            <h4>DNI : {client?.direction}</h4>
            <h4>Tel 01 : {client?.phone1}</h4>
            <h4>Tel 02 : {client?.phone2 ? client.phone2 : "..."}</h4>
            <h4>Nota : {client?.nota}</h4>
            <h4>
              Fecha de Alta : {moment(client?.createdAt).format("DD-MM-yyyy")}
            </h4>
          </div>
          <div className="user-header-action">
            {role === "admin" && <button>Edit</button>}
            {/* <button>Borar</button> */}
          </div>
          {/* <Link to="/users/userId">Ver Usuario</Link> */}
        </div>
      </div>
      {/* <hr /> */}
      {/* <div className="search-box-userworks">
        <form className="w-full" onSubmit={searchworksClient}>
          <i class="fas fa-search"></i>
          <input
            value={searchvalue}
            onChange={(e) => {
              setSearchvalue(e.target.value);
            }}
            placeholder={`Buscar trabajo para ${client?.name}`}
            type="text"
          />
        </form>
        <button className="btn">Buscar Trabajo</button>
      </div> */}
      {/* <hr /> */}
      {
        <div className="works-grid">
          {clientWorks.length > 0 ? (
            loadingWorkUser ? (
              <SmallLoading />
            ) : (
              clientWorks.map((work) => <Work key={work._id} work={work} />)
            )
          ) : (
            <div className="no-result">
              <h1 className="no-works">
                <span>{client?.name} </span>nunca hizo un trabajo...
              </h1>
              <i class="fas fa-sad-tear"></i>
            </div>
          )}
          <div className="bg-gray-200 add-work-user shadow rounded hover:bg-gray-300 hover:shadow-lg">
            <Link
              to={`/work/add#${client?._id}`}
              className="flex justify-center items-center h-full text-pink-500"
            >
              <i class="fas fa-plus-circle duration-800"></i>
            </Link>
          </div>
        </div>
      }
      {/* <Link to="/users/userId">Ver Usuario</Link> */}

      <div className="modal-client-img hidden absolute z-10 bg-gray-600 w-full bg-opacity-50 place-content-center max-h-auto min-h-screen flex justify-center items-center top-0 left-0">
        <div
          onClick={showModalClient}
          className="overlay  absolute h-full w-full top-0 left-0"
        ></div>

        <div id="img-client" className="flex justify-center  items-center">
          <img
            className="max-w-lg z-20 border-2 border-bg-red-200"
            src={`/assets/img/client/${client?.pathImg}`}
          />
        </div>
        <span
          onClick={showModalClient}
          className="absolute text-center flex justify-center items-center text-right top-10 right-10 h-10 w-10 rounded-full bg-white shadow-md p-1 cursor-pointer"
        >
          <i class="far fa-times-circle text-3xl text-red-300"></i>
        </span>
      </div>
    </div>
  );
};
