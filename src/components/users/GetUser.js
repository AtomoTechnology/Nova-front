import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Work } from '../works/Work';
import moment from 'moment';
import userLogo from '../../templatePics/userLogo.png';
import {
  getWorksClient,
  startDeleteClient,
  startEditClient,
  startGettingOneClient,
} from '../../action/clientsAction';
import { useForm } from '../../hooks/useForm';
import { SmallLoading } from '../SmallLoading';
import { Link } from 'react-router-dom';
export const GetUser = ({ match, history }) => {
  // console.log(match);
  const clientId = match.params.clientId;
  const [errores, setErrores] = useState([]);
  const [loadingWorkUser, setLoadingWorkUser] = useState(true);
  const { role, uid } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [addingUser, setAddingUser] = useState(false);
  const [idChange, setIdChange] = useState(null);

  useEffect(() => {
    dispatch(startGettingOneClient(clientId));
  }, [dispatch, clientId]);

  const { client } = useSelector((state) => state.clients);
  // console.log(client);

  const [values, handleInputChange, reset] = useForm({
    name: client?.name,
    dni: client?.dni,
    phone1: client?.phone1,
    phone2: client?.phone2,
    direction: client?.direction,
    nota: client?.nota,
    email: client?.email ? client.email : '',
  });

  useEffect(() => {
    dispatch(getWorksClient(client?._id));
    setLoadingWorkUser(false);
  }, [dispatch, setLoadingWorkUser, client?._id]);
  const { name, dni, phone1, phone2, direction, nota, email } = values;

  // form manage
  // do the login method
  const handleUpdateClient = (e) => {
    e.preventDefault();
    console.log('entra');
    setAddingUser(true);
    if (verifyForm()) {
      dispatch(startEditClient(values, clientId));
      document.querySelector('.edit-client').classList.toggle('active');
    } else {
      console.log(errores);
    }
    setAddingUser(false);
  };
  // varify the form values
  const verifyForm = () => {
    let ok = true;
    let errors = [];

    if (!name) {
      ok = false;
      errors.name = true;
    }
    if (!email) {
      ok = false;
      errors.email = true;
    }
    // if (!direction || direction.trim().length === 0) {
    // 	ok = false;
    // 	errors.direction = true;
    // }
    if (!dni || dni.length < 8 || dni.length > 11) {
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

  let { clientWorks } = useSelector((state) => state.clients);

  const showModalClient = () => {
    document.querySelector('.modal-client-img').classList.toggle('hidden');
  };
  const toggleModalEditClient = (e) => {
    document.querySelector('.edit-client').classList.toggle('active');
    reset();
  };
  const toggleModalDeleteClient = (e) => {
    document.querySelector('.delete-client-box').classList.toggle('active');
  };
  const deleteCliente = (e) => {
    dispatch(startDeleteClient(clientId));
    document.querySelector('.delete-client-box').classList.toggle('active');
    setTimeout(() => {
      history.push('/clients');
    }, 500);
  };
  // console.log(name, dni, phone1, direction);

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
      <div className="delete-client-box">
        <div className="delete-client-overlay" onClick={toggleModalDeleteClient}></div>
        <div className="delete-client shadow rounded">
          <div className="delete-client-header">Borrar Cliente</div>
          <div className="delete-client-body">
            <h3>
              Estas seguro de borrar el cliente? <br></br>
              <br></br>
              <span className="username bg-gray-800 text-red-300 p-2 mt-1 shadow rounded">
                {client?.dni}
              </span>
            </h3>
            <div className="delete-cliente-response">
              <div className="user-header-action flex justify-between gap-2">
                <button
                  className=" bg-red-600 shadow-md rounded-full hover:bg-red-700 "
                  onClick={deleteCliente}
                >
                  SI
                </button>
                <button
                  onClick={toggleModalDeleteClient}
                  className=" bg-gray-800 shadow hover:bg-gray-900 rounded-full "
                >
                  NO
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

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
              <img src={userLogo} alt="logo user" className="rounded-full h-full w-full" />
            )}
          </div>
          <div className="user-info">
            <h4>Nombre : {client?.name}</h4>
            <h4>DNI : {client?.dni}</h4>
            <h4>DNI : {client?.email ? client?.email : '---'}</h4>
            <h4>Dirección : {client?.direction ? client.direction : '---'}</h4>
            <h4>Tel 01 : {client?.phone1}</h4>
            <h4>Tel 02 : {client?.phone2 ? client.phone2 : '---'}</h4>
            <h4>Nota : {client?.nota ? client.nota : '---'}</h4>
            <h4>Fecha de Alta : {moment(client?.createAt).format('DD-MM-yyyy HH:mm:ss')}</h4>

            {client?._id === uid && (
              <Link className="text-green-600" to="/user/update-password">
                Cambiar contraseña
              </Link>
            )}
          </div>
          {role === 'admin' && (
            <div className="user-header-action flex flex-col gap-2">
              <button
                className=" bg-blue-700 shadow-md rounded-full hover:bg-blue-900 "
                onClick={toggleModalEditClient}
              >
                Edit
              </button>
              <button
                onClick={toggleModalDeleteClient}
                className=" bg-red-700 shadow rounded-full "
              >
                Borar
              </button>
            </div>
          )}
          {/* <Link to="/users/userId">Ver Usuario</Link> */}
        </div>
      </div>
      {/* <hr /> */}
      {/* <div className="search-box-userworks">
				<form className="w-full">
					<i class="fas fa-search"></i>
					<input
						// value={searchvalue}
						onChange={(e) => {
							// setSearchvalue(e.target.value);
						}}
						placeholder={`Buscar trabajo para ${client?.name}`}
						type="text"
					/>
				</form>
				<button className="btn">Buscar Trabajo</button>
			</div> */}
      {/* <hr /> */}
      <div className="my-3 p-1 text-2Xl text-gray-800 shadow">
        TOTAL TRABAJOS : {clientWorks.length}
      </div>
      {
        <div className="works-grid">
          {clientWorks.length > 0 ? (
            loadingWorkUser ? (
              <SmallLoading />
            ) : (
              clientWorks.map((work) => (
                <Work key={work._id} setIdChange={setIdChange} idChange={idChange} work={work} />
              ))
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
      <div className="edit-client">
        <div onClick={toggleModalEditClient} className="edit-client-overlay"></div>
        <div className="form-update-box">
          <form onSubmit={handleUpdateClient} className="user-edit-form  shadow-lg rounded-md">
            <span onClick={toggleModalEditClient} className="close absolute right-2 top-2">
              <i className="fas fa-times-circle p-2 bg-red-500 hover:bg-red-700 text-white rounded-full shadow-md cursor-pointer"></i>
            </span>
            <h3>Actualizar Cliente</h3>
            <div className="form-grid">
              <div>
                <label>
                  Nombre Cliente <span className="text-red-600">*</span>
                </label>
                <input
                  onChange={handleInputChange}
                  value={name}
                  type="text"
                  name="name"
                  placeholder="ingresa el nombre"
                  className="shadow"
                />
                {errores.name ? (
                  <span className="text-red-500 text-center bg-red-100 p-1">
                    El nombre es obligatorio
                  </span>
                ) : null}{' '}
              </div>
              <div>
                <label>
                  DNI <span className="text-red-600">*</span>
                </label>
                <input
                  onChange={handleInputChange}
                  value={dni}
                  type="text"
                  placeholder="ingresa el dni"
                  name="dni"
                  className="shadow"
                />
                {errores.dni ? (
                  <span className="text-red-500 text-center bg-red-100 p-1">
                    El dni es obligatorio. [8 , 11] digitos
                  </span>
                ) : null}
              </div>
              <div>
                <label>Correo</label>
                <input
                  className="shadow"
                  onChange={handleInputChange}
                  value={email}
                  type="email"
                  name="email"
                  placeholder="Ingrese su correo electronico"
                />
                {errores.email ? (
                  <span className="text-red-500 text-center bg-red-100 p-1">
                    El email es obligatorio y debe ser valido
                  </span>
                ) : null}
              </div>
              <div>
                <label>
                  Telefono 1 <span className="text-red-600">*</span>
                </label>
                <input
                  onChange={handleInputChange}
                  value={phone1}
                  type="text"
                  name="phone1"
                  placeholder="ingresa el numero de celular"
                  className="shadow"
                />
                {errores.phone1 ? (
                  <span className="text-red-500 text-center bg-red-100 p-1">
                    Tenes que ingregar por lo menos un celular
                  </span>
                ) : null}
              </div>
              <div>
                <label>Telefono 2</label>
                <input
                  onChange={handleInputChange}
                  value={phone2}
                  type="text"
                  name="phone2"
                  placeholder="ingresa el segundo telefono"
                  className="shadow"
                />{' '}
              </div>
              <div>
                <label>Dirección</label>
                <input
                  className="shadow"
                  onChange={handleInputChange}
                  value={direction}
                  type="text"
                  name="direction"
                  placeholder="ingresa la direccion"
                />
              </div>
              <div>
                <label>Nota</label>
                <input
                  className="shadow"
                  onChange={handleInputChange}
                  value={nota}
                  type="text"
                  name="nota"
                  placeholder="ingresa una nota"
                />
              </div>
            </div>

            <br />
            <button disabled={addingUser} className="btn shadow-lg" type="submit">
              {addingUser ? 'Actualizando... ' : ' Actualizar Cliente'}
            </button>
          </form>
        </div>
      </div>

      <div className="modal-client-img hidden absolute z-10 bg-gray-600 w-full bg-opacity-50 place-content-center max-h-auto min-h-screen flex justify-center items-center top-0 left-0">
        <div
          onClick={showModalClient}
          className="overlay  absolute h-full w-full top-0 left-0"
        ></div>

        <div id="img-client" className="flex justify-center  items-center">
          <img
            className="max-w-lg z-20 border-2 border-bg-red-200"
            alt="logo user"
            src={userLogo}
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
