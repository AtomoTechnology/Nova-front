import React, { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { useDispatch } from "react-redux";
import { startRegister } from "../../action/authAction";
export const Register = ({ history }) => {
  const dispatch = useDispatch();

  const [formOk, setFormOk] = useState(true);
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [values, handleInputChange, reset] = useForm({
    username: "",
    password: "",
  });
  const { username, password } = values;

  const handleRegister = (e) => {
    e.preventDefault();
    setLoadingRegister(true);
    // console.log(username, password);
    if (verifyForm()) {
      dispatch(startRegister(username, password));
      reset();
      history.push("/");
    } else {
      console.log("verifica los datos");
    }
    setLoadingRegister(false);
  };

  const verifyForm = () => {
    let ok = true;
    if (username.trim().length < 5) {
      ok = false;
    }
    if (password.trim().length < 6) {
      ok = false;
    }
    setFormOk(ok);
    console.log(ok);

    if (ok) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="auth__register">
      <form onSubmit={handleRegister} className="register-form">
        <h3>Registrar Usuario</h3>
        {!formOk && (
          <ul className="error-form">
            <li className="help-1">
              Verifica que el usuario y la contraseña son correctos
            </li>
            <br></br>
            <li className="help-2">
              Deben tener como minimo 6 caracteres y el usuario debe ser unico.
            </li>
          </ul>
        )}

        <label>Username</label>
        <input
          value={username}
          onChange={handleInputChange}
          type="text"
          name="username"
        />
        <label>password</label>
        <input
          value={password}
          onChange={handleInputChange}
          type="password"
          name="password"
        />
        <br />
        <button className="btn" type="submit">
          {loadingRegister ? "Registrando..." : "Registrarse"}
        </button>
      </form>
    </div>
  );
};
