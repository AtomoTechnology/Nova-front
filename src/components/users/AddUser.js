import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startCreatingClient } from '../../action/clientsAction';
import { useForm } from '../../hooks/useForm';
import logo from '../../templatePics/logo03.png';

const AddUser = ({ history }) => {
  const dispatch = useDispatch();
  const [errores, setErrores] = useState([]);
  const [addingUser, setAddingUser] = useState(false);
  const [urlImagen, setUrlImagen] = useState('');

  const auth = useSelector((state) => state.auth);

  const [values, handleInputChange, reset] = useForm({
    name: '',
    dni: '',
    phone1: '',
    phone2: '',
    direction: '',
    nota: '',
    file: '',
    pathImg: '',
    password: '',
    passwordConfirm: '',
    email: '',
    role: 'user',
  });

  let { name, dni, phone1, phone2, direction, nota, password, passwordConfirm, email, role } = values;

  const imageChange = (e) => {
    // setFile(e.target.files[0]);
    // console.log(e.target.files[0].size);
    if (e.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (ev) => {
        let img = ev.target.result;
        setUrlImagen(img);
        document.querySelector('.imgLoad').setAttribute('src', img);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
    // showImg(e.target.files[0]);
  };

  // do the login method
  const handleCreateClient = async (e) => {
    setAddingUser(true);
    e.preventDefault();
    if (verifyForm()) {
      // console.log(urlImagen);
      dispatch(startCreatingClient(values, urlImagen));
      reset();
      setTimeout(() => {
        history.push('/clients');
        // window.location.href = '/clients';
        // window.location.replace('/clients');
        // window.location.reload(true);
      }, 1000);
    }
    //  else {
    //   console.log(errores);
    //   console.log(values);
    // }
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
    if (!password || password.trim().length < 6) {
      ok = false;
      errors.password = true;
    }
    if (!passwordConfirm || passwordConfirm !== password) {
      ok = false;
      errors.passwordConfirm = true;
    }
    if (!dni || dni.length < 8 || dni.length > 11) {
      ok = false;
      errors.dni = true;
    }

    if (!email) {
      ok = false;
      errors.email = true;
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

  return (
    <div className="user-add py-4 bg-gray-800 ">
      <div
        onClick={() => {
          history.push('/index');
        }}
        className="header-logo hover:shadow-lg mt-8 bg-white cursor-pointer"
      >
        <img src={logo} width="45" alt="Nova Technology" />
      </div>
      <form onSubmit={handleCreateClient} className="user-add-form rounded p-4">
        <h3 className="title-form">Crear tu Cuenta</h3>
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
              <span className="text-red-500 text-center bg-red-100 p-1">El dni es obligatorio. [8 , 11] digitos</span>
            ) : null}
          </div>
          <div>
            <label>
              Correo <span className="text-red-600">*</span>
            </label>
            <input
              className="shadow"
              onChange={handleInputChange}
              value={email}
              type="email"
              name="email"
              placeholder="Ingrese su correo electronico"
            />
            {errores.email ? (
              <span className="text-red-500 text-center bg-red-100 p-1">El email es obligatorio y debe ser valido</span>
            ) : null}
          </div>
          {auth.role === 'admin' && (
            <div>
              <label>Rol</label>
              <select name="role" value={role} onChange={handleInputChange}>
                <option value="user"> Usuario </option>
                <option value="tecnico"> Tecnico </option>
                <option value="admin"> Administrador </option>
              </select>
              {errores.email ? (
                <span className="text-red-500 text-center bg-red-100 p-1">
                  El email es obligatorio y debe ser valido
                </span>
              ) : null}
            </div>
          )}

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
            <label>Contraseña</label>
            <input
              className="shadow"
              onChange={handleInputChange}
              value={password}
              type="password"
              name="password"
              placeholder="ingresa una contraseña"
            />
            {errores.password ? (
              <span className="text-red-500 text-center bg-red-100 p-1">
                Contraseña invalida. debe tener minimo 6 caracteres.
              </span>
            ) : null}
          </div>
          <div>
            <label>Confirma Contreseña</label>
            <input
              className="shadow"
              onChange={handleInputChange}
              value={passwordConfirm}
              type="password"
              name="passwordConfirm"
              placeholder="Repetir contraseña"
            />
            {errores.passwordConfirm ? (
              <span className="text-red-500 text-center bg-red-100 p-1">Las Contraseñas no coinciden</span>
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

          {/* <div className="img  bg-gray-200 p-10 "> */}
          {/* </div> */}
        </div>
        {/* <div className="my-2">
          <label
            htmlFor="loadImg"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            className="loadImage gap-x-2 hover:bg-gray-800 bg-gray-900 text-white cursor-pointer flex justify-between p-1 rounded align-center"
          >
            <i className="fas fa-plus-circle text-center align-center text-white text-3xl  flex rounded-full p-1 justify-between"></i>
            <span className="text-white"> Subir Foto</span>
          </label>
          <input
            id="loadImg"
            onChange={imageChange}
            type="file"
            className="hidden"
            name="file"
            accept="image/*"
          />
        </div> */}
        {/* <img className="w-32 imgLoad" alt="loading " /> */}
        <br />
        <button disabled={addingUser} className="btn jhm-shadow bg-red-500 hover:bg-red-700" type="submit">
          {addingUser ? 'Creando cuenta...' : 'Crear Cuenta'}
        </button>
        <div className="register-section my-4 text-sx text-blue-600 text-center ">
          <span className="text-sm">
            ¿Ya tiene una cuenta ?
            <Link to="/login" className="text-pink-800 ml-1 hover:text-pink-700 hover:shadow hover:underline p-1">
              Inicia Session
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};
export default AddUser;
