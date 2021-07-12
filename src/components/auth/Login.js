import React from "react";
import { useDispatch } from "react-redux";
import { startLogin } from "../../action/authAction";
import { useForm } from "../../hooks/useForm";
// import bg from "assets/img/bg.jpg";
// import { dbConnect } from "../../database/Firebase";

export const Login = ({ history }) => {
  const dispatch = useDispatch();
  const [values, handleInputChange] = useForm({
    username: "administrador",
    password: "admin1",
  });
  const { username, password } = values;
  // do the login method
  const handleSubmitLogin = (e) => {
    e.preventDefault();
    console.log(username, password);
    if (verifyForm()) {
      // history.push("/");
      // console.log("login ok");
      dispatch(startLogin(username, password));
    } else {
      console.log("verifica los datos");
      // history.push("/auth/register");
    }
    // console.log(username, password);
  };
  // varify the form values
  const verifyForm = () => {
    let ok = true;
    if (username.trim().length < 5) {
      ok = false;
    }
    if (password.trim().length < 6) {
      ok = false;
    }

    if (ok) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div className="auth__login">
      <form onSubmit={handleSubmitLogin} className="auth__login-form">
        <h3>Inicia sesion</h3>
        <label>Username</label>
        <input
          value={username}
          onChange={handleInputChange}
          type="text"
          name="username"
        />
        {/* <span>username required</span> */}
        <label>password</label>
        <input
          value={password}
          onChange={handleInputChange}
          type="password"
          name="password"
        />
        <br />
        <button className="btn" type="submit">
          Inicia Sesion
        </button>
      </form>
    </div>
  );
};
