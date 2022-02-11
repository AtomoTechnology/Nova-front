import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogin } from '../../action/authAction';
import { useForm } from '../../hooks/useForm';
import logo from '../../templatePics/logo03.png';
import { SmallLoading } from '../SmallLoading';

export const Login = ({ history }) => {
  const [errores, setErrores] = useState({});
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [values, handleInputChange] = useForm({
    dni: '',
    password: '',
  });
  const { dni, password } = values;

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    if (verifyForm()) {
      dispatch(startLogin(dni, password));
    } else {
      console.log('verifica los datos');
      console.log(errores);
    }
    setLoading(false);
  };

  // varify the form values
  const verifyForm = () => {
    let ok = true;
    let error = {};
    if (dni.trim().length < 8) {
      ok = false;
      error.dni = true;
    }
    if (!password) {
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
    <div className="auth__login bg-blue-500 w-full h-screen flex flex-col justify-center items-center gap-7 ">
      <div
        onClick={() => {
          history.push('/index');
        }}
        className="header-logo hover:shadow-lg  bg-white cursor-pointer"
      >
        <img src={logo} width="45" alt="Nova Technology" />
      </div>
      <form
        onSubmit={handleSubmitLogin}
        className="auth__login-form flex items-center justify-between flex-col shadow-lg rounded-sm bg-white p-6 mx-2 "
      >
        <h3 className="title-form">Nova Technology</h3>
        <fieldset>
          <label>DNI</label>
          <input value={dni} onChange={handleInputChange} type="text" name="dni" />
          {errores.dni ? <span className="text-red-500 text-center  p-1">Ingrese un DNI valido </span> : null}{' '}
        </fieldset>

        <fieldset>
          <label>Contraseña</label>
          <input value={password} onChange={handleInputChange} type="password" name="password" />
          {errores.password ? <span className="text-red-500 text-center  p-1">Contraseña requerida</span> : null}
        </fieldset>
        <fieldset>
          <button disabled={loading} className="btn bg-red-500 hover:bg-red-700" type="submit">
            {!loading ? 'Inicia Sesion' : <SmallLoading text="Espera..." size="small" />}
          </button>
        </fieldset>
        <div className="register-section text-sx text-blue-600 ">
          <span className="text-sm">
            ¿Aun no tiene una cuenta ?
            <Link to="/register" className="text-pink-800 ml-1 hover:underline  p-1">
              Registrarse
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};
