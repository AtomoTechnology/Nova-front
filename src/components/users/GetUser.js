import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWorksClient, startDeleteClient, startEditClient, startGettingOneClient } from '../../action/clientsAction';
import { useForm } from '../../hooks/useForm';
import { SmallLoading } from '../SmallLoading';
import { Link } from 'react-router-dom';
import { updatePassword } from '../../action/authAction';
import { WorkClient } from '../works/WorkClient';
import { fetchWithToken } from '../../helpers/fetchWithOutToken';
import { showAlert } from '../alerts';

const GetUser = ({ match, history }) => {
  const [loadingWorkUser, setLoadingWorkUser] = useState(true);
  const [errores, setErrores] = useState([]);
  const { role, uid } = useSelector((state) => state.auth);
  const [addingUser, setAddingUser] = useState(false);
  const [idChange, setIdChange] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [photo, setPhoto] = useState('');
  const userImageBox = useRef();
  const [loadingUpdatePhoto, setLoadingUpdatePhoto] = useState(false);

  const clientId = match.params.clientId;

  useEffect(() => {
    async function GetUserById() {
      await dispatch(startGettingOneClient(clientId));
    }
    GetUserById();
  }, [dispatch, clientId]);

  useEffect(() => {
    dispatch(getWorksClient(clientId));
    setLoadingWorkUser(false);
  }, [dispatch, setLoadingWorkUser, clientId]);

  let { clientWorks } = useSelector((state) => state.clients);
  const { client } = useSelector((state) => state.clients);

  const [values, handleInputChange, reset] = useForm({
    name: client?.name,
    dni: client?.dni,
    phone1: client?.phone1,
    phone2: client?.phone2,
    direction: client?.direction,
    nota: client?.nota,
    email: client?.email ? client.email : '',
    currentPassword: '',
    password: '',
    passwordConfirm: '',
  });

  const { name, dni, phone1, phone2, direction, nota, email, currentPassword, password, passwordConfirm } = values;

  const handleUpdateClient = async (e) => {
    e.preventDefault();
    setAddingUser(true);
    if (verifyForm()) {
      await dispatch(startEditClient(values, clientId));
      document.querySelector('.edit-client').classList.toggle('active');
    }
    setAddingUser(false);
  };

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
  const deleteCliente = async (e) => {
    await dispatch(startDeleteClient(clientId));
    document.querySelector('.delete-client-box').classList.toggle('active');
    setTimeout(() => {
      history.push('/clients');
    }, 500);
  };

  const UpdatePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (verifyFormPass()) {
      await dispatch(updatePassword(values));
      reset();
    }
    setLoading(false);
  };

  const verifyFormPass = () => {
    let ok = true;
    let error = {};
    if (!currentPassword || currentPassword.trim().length < 6) {
      ok = false;
      error.currentPassword = true;
    }
    if (!password || password.trim().length < 6) {
      ok = false;
      error.password = true;
    }
    if (password !== passwordConfirm) {
      ok = false;
      error.passwordConfirm = true;
    }

    setErrores(error);
    if (ok) {
      return true;
    } else {
      return false;
    }
  };

  const verifyForm = () => {
    let ok = true;
    let errors = [];
    const regex = /^[0-9]*$/;

    if (!name) {
      ok = false;
      errors.name = true;
    }
    if (!email) {
      ok = false;
      errors.email = true;
    }

    if (!dni || dni.length < 8 || dni.length > 11 || !regex.test(dni)) {
      ok = false;
      errors.dni = true;
    }
    if (!phone1 || phone1.length < 7 || !regex.test(phone1)) {
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

  const ConvertPhoto = (e) => {
    userImageBox.current.innerHTML = '';
    var reader = new FileReader();
    reader.onload = function (e) {
      let url = e.target.result;
      let div = document.createElement('img');
      div.classList.add(`user-image`);
      div.setAttribute('src', url);
      div.setAttribute('width', 150);
      userImageBox.current.appendChild(div);
      setPhoto(url);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const UpdatePhoto = async (e) => {
    e.preventDefault();
    setLoadingUpdatePhoto(true);
    const resp = await fetchWithToken(`users/updateAvatar/${clientId}`, { photo }, 'POST');
    const body = await resp.json();
    if (body.status === 'success') {
      showAlert('success', body.message);
      userImageBox.current.innerHTML = '';
      // setPhoto('');
      // setInterval(() => {
      //   window.location.reload();
      //   // return false;
      // }, 2000);
    } else {
      showAlert('error', body.message);
    }
    setLoadingUpdatePhoto(false);
  };

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
              <span className="username bg-gray-800 text-red-300 p-2 mt-1 shadow rounded">{client?.dni}</span>
            </h3>
            <div className="delete-cliente-response">
              <div className="user-header-action flex justify-between gap-2">
                <button className=" bg-red-600 shadow-md rounded-full hover:bg-red-700 " onClick={deleteCliente}>
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

      <div className="user-setting m-auto my-2 w-10/12  ">
        <div className="flex justify-between   shadow ">
          <div className="one-user-option hidden sm:block bg-pink-700 w-60 bg-gradient-to-r from-pink-400 to-pink-500 rounded-l">
            <ul className="mt-10 sticky top-14">
              <li className="menu-item my-2 ">
                <a className="hover:bg-pink-300  hover:border-l-4  hover:border-gray-100 p-2 " href="#misdatos">
                  <span className="title">Mis Datos</span>
                </a>
              </li>
              <li className="menu-item my-2  ">
                <a
                  className="hover:bg-pink-300  hover:border-l-4  hover:border-gray-100 p-2 "
                  href="#cambiarcontraseña"
                >
                  <span className="title">Cambiar Contraseña</span>
                </a>
              </li>
              <li className="menu-item my-2  ">
                <a className="hover:bg-pink-300  hover:border-l-4  hover:border-gray-100 p-2 " href="#mistrabajos">
                  <span className="title">Mis Trabajos</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="user-info w-full rounded-r p-2 sm:w-9/12 m-auto bg-white">
            <div id="misdatos" className="m-auto mt-3 w-9/12">
              <form className="">
                <span onClick={toggleModalEditClient} className="close absolute right-2 top-2">
                  <i className="fas fa-times-circle p-2 bg-red-500 hover:bg-red-700 text-white rounded-full shadow-md cursor-pointer"></i>
                </span>
                {/* <h3>Actualizar Cliente</h3> */}
                <div className="form-grid">
                  {client?.photo && <img width={100} src={client.photo} alt={client.name} />}
                  <div>
                    <label>Nombre Cliente :</label>
                    <span> {client?.name} </span>
                  </div>
                  <div>
                    <label>DNI :</label>
                    <span> {client?.dni}</span>
                  </div>
                  <div>
                    <label>Correo : </label>
                    <span> {client?.email}</span>
                  </div>
                  <div>
                    <label>Telefono 1 :</label>
                    <span> {client?.phone1}</span>
                  </div>
                  <div>
                    <label>Telefono 2 : </label>
                    <span> {client?.phone2}</span>
                  </div>
                  <div>
                    <label>Dirección : </label>
                    <span> {client?.direction}</span>
                  </div>
                  <div>
                    <label>Nota : </label>
                    <span> {client?.nota}</span>
                  </div>
                  {/* <hr className="my-3" /> */}
                  <div>
                    <label>TOTAL TRABAJOS :</label>
                    <span> {clientWorks.length}</span>
                  </div>
                </div>

                <br />

                {role === 'admin' && (
                  <div className="user-header-action justify-end my-2 mb-3 flex gap-2">
                    <span
                      className="hover:text-white border-2 border-gray-200 hover:shadow-md rounded-full px-3 py-1 text-gray-900 cursor-pointer w-fit bg-green-500 hover:bg-green-900 "
                      onClick={toggleModalEditClient}
                      type="button"
                    >
                      Editar
                    </span>
                    <span
                      onClick={toggleModalDeleteClient}
                      className="px-3 py-1 text-white w-fit bg-red-700 shadow rounded-full "
                      type="button"
                    >
                      Borrar
                    </span>
                  </div>
                )}

                {role !== 'admin' && client?._id === uid && (
                  <div className="flex justify-end">
                    <span
                      className="hover:text-white border-2 !bg-green-600 border-gray-200 hover:shadow-md rounded-full px-3 py-1 text-gray-900 cursor-pointer w-fit hover:bg-green-800 "
                      onClick={toggleModalEditClient}
                      type="button"
                    >
                      Editar
                    </span>
                  </div>
                )}

                {/* <div className="flex justify-end my-2">
                  {!editMode ? (
                    <span
                      className="text-center cursor-pointer text-white w-20 rounded-full bg-yellow-600 hover:bg-yellow-700 "
                      onClick={() => setEditMode(true)}
                    >
                      Editar
                    </span>
                  ) : (
                    <button
                      disabled={addingUser}
                      className=" w-40 rounded-full bg-green-600 hover:bg-green-700 "
                      type="submit"
                    >
                      {addingUser ? 'Guardando... ' : 'Guardar Cambios'}
                    </button>
                  )}
                </div> */}
              </form>
            </div>
            <hr />
            {(role === 'admin' || client?._id === uid) && (
              <div className="w-9/12 shadow-sm rounded p-2 m-auto">
                <form onSubmit={UpdatePhoto}>
                  <fieldset>
                    <label htmlFor="photo">Subir Foto</label>
                    <input required onChange={ConvertPhoto} type="file" accept="image/*" name="photo" />
                  </fieldset>
                  <fieldset ref={userImageBox}></fieldset>
                  <fieldset>
                    <button disabled={loadingUpdatePhoto} type="submit" className="btn hover:bg-green-600 bg-green-500">
                      {loadingUpdatePhoto ? <SmallLoading text="" size="small" /> : 'Actualizar imagen'}
                    </button>
                  </fieldset>
                </form>
              </div>
            )}

            {client?._id === uid && (
              <>
                <hr className="my-3" />
                <form
                  onSubmit={UpdatePassword}
                  id="cambiarcontraseña"
                  className="update-password-form w-9/12 m-auto my-4"
                >
                  <label>Actual contraseña</label>
                  <input
                    value={currentPassword}
                    onChange={handleInputChange}
                    type="password"
                    name="currentPassword"
                    placeholder="********"
                  />
                  {errores.currentPassword ? (
                    <span className="update-password-error block my-1 text-red-500 text-center bg-red-100 p-1">
                      Ingresa su contraseña vieja{' '}
                    </span>
                  ) : null}{' '}
                  <label>Contraseña</label>
                  <input
                    value={password}
                    onChange={handleInputChange}
                    type="password"
                    name="password"
                    placeholder="********"
                  />
                  {errores.password ? (
                    <span className="update-password-error block my-1 text-red-500 text-center bg-red-100 p-1">
                      Ingrese una nueva contraseña{' '}
                    </span>
                  ) : null}{' '}
                  <label>Confirma Contraseña</label>
                  <input
                    value={passwordConfirm}
                    onChange={handleInputChange}
                    type="password"
                    name="passwordConfirm"
                    placeholder="********"
                  />
                  {errores.passwordConfirm ? (
                    <span className="update-password-error block my-1 text-red-500 text-center bg-red-100 p-1">
                      Las contraseñas no coinciden
                    </span>
                  ) : null}{' '}
                  <br />
                  <div className="flex justify-end my-7">
                    <button className="w-44 rounded-full bg-green-600 hover:bg-green-700" type="submit">
                      {loading ? <SmallLoading size="small" text="" /> : 'Cambiar Contraseña'}
                    </button>
                  </div>
                </form>
              </>
            )}
            <hr className="my-3" />

            {
              <div id="mistrabajos" className="works-grid-client grid  m-auto w-10/12">
                {clientWorks.length > 0 ? (
                  loadingWorkUser ? (
                    <SmallLoading />
                  ) : (
                    clientWorks.map((work) => (
                      <WorkClient key={work._id} setIdChange={setIdChange} idChange={idChange} work={work} />
                    ))
                  )
                ) : (
                  <div className="no-result p-2 mx-2 bg-red-200 text-center">
                    <h1 className="no-works">
                      <span>{client?.name} </span>nunca hizo un trabajo...
                    </h1>
                    <i className="fas fa-sad-tear text-red-600 text-3xl"></i>
                  </div>
                )}
                <div className="bg-gray-200 p-2 my-2 add-work-user shadow rounded hover:bg-gray-300 hover:shadow-lg">
                  <Link
                    to={`/work/add#${client?._id}`}
                    className="flex justify-center items-center h-full text-pink-500"
                  >
                    <i className="fas fa-plus-circle duration-800"></i>
                  </Link>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
      {/* <hr /> */}
      {/* <div className="search-box-userworks">
				<form className="w-full">
					<i className="fas fa-search"></i>
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
                  <span className="text-red-500 text-center bg-red-100 p-1">El nombre es obligatorio</span>
                ) : null}
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
                />
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
            <button disabled={addingUser} className="btn bg-red-500 hover:bg-red-700" type="submit">
              {addingUser ? 'Actualizando... ' : ' Actualizar Cliente'}
            </button>
          </form>
        </div>
      </div>

      {/* <div className="modal-client-img hidden absolute z-10 bg-gray-600 w-full bg-opacity-50 place-content-center max-h-auto min-h-screen flex justify-center items-center top-0 left-0">
        <div onClick={showModalClient} className="overlay  absolute h-full w-full top-0 left-0"></div>

        <div id="img-client" className="flex justify-center  items-center">
          <img className="max-w-lg z-20 border-2 border-bg-red-200" alt="logo user" src={userLogo} />
        </div>
        <span
          onClick={showModalClient}
          className="absolute text-center flex justify-center items-center  top-10 right-10 h-10 w-10 rounded-full bg-white shadow-md p-1 cursor-pointer"
        >
          <i className="far fa-times-circle text-3xl text-red-300"></i>
        </span>
      </div> */}
    </div>
  );
};
export default GetUser;
