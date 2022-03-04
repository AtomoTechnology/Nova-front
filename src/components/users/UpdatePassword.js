import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updatePassword } from '../../action/authAction';
import { useForm } from '../../hooks/useForm';
import { SmallLoading } from '../SmallLoading';

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const [values, handleInputChange, reset] = useForm({
    currentPassword: '',
    password: '',
    passwordConfirm: '',
  });
  const [errores, setErrores] = useState({});
  const { currentPassword, password, passwordConfirm } = values;
  const [loading, setLoading] = useState(false);

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (verifyForm()) {
      await dispatch(updatePassword(values));
      reset();
    }
    setLoading(false);
  };

  const verifyForm = () => {
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
  return (
    <div className="update-password">
      <form onSubmit={handleSubmitLogin} className="update-password-form">
        <label>Actual contraseña</label>
        <input value={currentPassword} onChange={handleInputChange} type="password" name="currentPassword" />
        {errores.currentPassword ? (
          <span className="update-password-error block my-1 text-red-500 text-center bg-red-100 p-1">
            Ingresa su contraseña vieja{' '}
          </span>
        ) : null}{' '}
        <label>Contraseña</label>
        <input value={password} onChange={handleInputChange} type="password" name="password" />
        {errores.password ? (
          <span className="update-password-error block my-1 text-red-500 text-center bg-red-100 p-1">
            Ingrese una nueva contraseña{' '}
          </span>
        ) : null}{' '}
        <label>Confirma Contraseña</label>
        <input value={passwordConfirm} onChange={handleInputChange} type="password" name="passwordConfirm" />
        {errores.passwordConfirm ? (
          <span className="update-password-error block my-1 text-red-500 text-center bg-red-100 p-1">
            Las contraseñas no coinciden
          </span>
        ) : null}{' '}
        <br />
        <button className="btn" type="submit">
          {loading ? <SmallLoading size="small" text="" /> : 'Cambiar Contraseña'}
        </button>
      </form>
    </div>
  );
};
export default UpdatePassword;
