import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogin } from '../../action/authAction';
import { useForm } from '../../hooks/useForm';
import logo from '../../templatePics/logo03.png';

export const Login = ({ history }) => {
  console.log(history);
  const dispatch = useDispatch();
  const [values, handleInputChange] = useForm({
    dni: '',
    password: '',
  });
  const [errores, setErrores] = useState({});
  const { dni, password } = values;

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    if (verifyForm()) {
      dispatch(startLogin(dni, password));
    } else {
      console.log('verifica los datos');
      console.log(errores);
    }
  };

  // varify the form values
  const verifyForm = () => {
    let ok = true;
    let error = {};
    if (dni.trim().length < 8) {
      ok = false;
      error.dni = true;
    }
    if (password.trim().length < 6) {
      ok = false;
      error.password = true;
    }

    setErrores(error);
    if (ok) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div className="auth__login">
      <form onSubmit={handleSubmitLogin} className="auth__login-form">
        <i
          onClick={() => {
            history.push('/index');
          }}
          class="fas fa-home w-8 h-8 rounded-full shadow bg-blue-600 text-white flex items-center justify-center cursor-pointer hover:w-12 hover:shadow-md hover:bg-blue-900 hover:h-12"
        ></i>
        <div className="header-logo">
          <img src={logo} width="45" alt="Nova Technology" />
        </div>
        <h3>Nova Technology</h3>
        <label>DNI</label>
        <input value={dni} onChange={handleInputChange} type="text" name="dni" />
        {errores.dni ? (
          <span className="text-red-500 text-center bg-red-100 p-1">Ingrese un DNI valido </span>
        ) : null}{' '}
        <label>Contraseña</label>
        <input value={password} onChange={handleInputChange} type="password" name="password" />
        {errores.password ? (
          <span className="text-red-500 text-center bg-red-100 p-1">
            Ingrese su una contraseña{' '}
          </span>
        ) : null}{' '}
        <br />
        <button className="btn" type="submit">
          Inicia Sesion
        </button>
        <div className="register-section text-sx text-blue-600 ">
          <span className="text-sm">
            ¿Aun no tiene una cuenta ?
            <Link
              to="/register"
              className="text-pink-800 ml-1 hover:text-pink-700 hover:shadow hover:bg-gray-100 p-1"
            >
              Registrarse
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};
