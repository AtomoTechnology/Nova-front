import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { startLogout } from "../../action/authAction";
// import NavaLogo from "../../assets/img/logo.png";
// import userLogo from "../../assets/img/userLogo.png";

export const NavbarLateral = () => {
  const { uid, role } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  // console.log(uid, role);

  const handleLogout = () => {
    dispatch(startLogout());
  };

  // if (window.innerWidth <= 500) {
  //   document.querySelector(".toggleMenu").classList.add("active");
  //   document.querySelector(".navbar").classList.add("active");
  // } else if (window.innerWidth > 500) {
  //   console.log("mayor que 500");
  //   console.log(window.innerWidth);
  // document.querySelector(".toggleMenu").classList.remove("active");
  // document.querySelector(".navbar").classList.remove("active");
  // }
  const manipulateInterface = () => {
    // const navegation = document.querySelector(".navegation");
    // const navbar = document.querySelector(".navbar");
    document.querySelector(".toggleMenu").classList.toggle("active");
    document.querySelector(".navbar").classList.toggle("active");
    document
      .querySelector(".content-principal")
      .classList.toggle("toggleContentPrincipal");
    document
      .querySelector(".content-header")
      .classList.toggle("toggleContentHeader");
    // document.querySelector(".content-principal").style.marginLeft = 80;

    // document.querySelector(".toggleMenu").addEventListener("click", (e) => {
    // navegation.classList.toggle("active");

    // navegation.classList.toggle("active");
    // });
  };
  return (
    <div className="navbar">
      <div className="navbar__container">
        {/* <div className="navbar__header"> */}
        {/* <Link to="/" className="navbar__header-logo">
            <img src={NavaLogo} alt="Logo Nova" />
          </Link> */}
        {/* <div className="navbar__header-user">
            <img src={userLogo} alt="User perfil" />
            <span className="navbar__header-user-username">usuario</span>
          </div> */}
        {/* </div> */}
        <div className="navegation">
          <ul>
            <li className="menu-item">
              <Link to="/">
                <span className="icon">
                  <i class="fas fa-home"></i>
                </span>
                <span className="title">Home</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/clients">
                <span className="icon">
                  <i className="fas fa-user"></i>
                </span>
                <span className="title">Clientes</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/works">
                <span className="icon">
                  <i className="fas fa-th-list"></i>
                </span>
                <span className="title">Trabajos</span>
              </Link>
            </li>
            {role === "admin" && (
              <li className="menu-item">
                <Link to="/auth/register">
                  <span className="icon">
                    <i className="fas fa-user-plus"></i>
                  </span>
                  <span className="title">Registar Usuario </span>
                </Link>
              </li>
            )}
            {role === "admin" && (
              <li className="menu-item">
                <Link to="/orders">
                  <span className="icon">
                    <i className="fas fa-th-list"></i>
                  </span>
                  <span className="title">Ordenes</span>
                </Link>
              </li>
            )}

            <li className="menu-item">
              <Link to="/client/add">
                <span className="icon">
                  <i class="fas fa-plus-circle"></i>
                </span>
                <span className="title">Agregar Cliente</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/work/add">
                <span className="icon">
                  <i class="fas fa-plus-circle"></i>
                </span>
                <span className="title">Agregar Trabajo</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/works/histories/all">
                <span className="icon">
                  <i class="fas fa-plus-circle"></i>
                </span>
                <span className="title">Historial De Trabajo</span>
              </Link>
            </li>
            <li onClick={handleLogout} className="menu-item">
              <Link to="#">
                <span className="icon">
                  <i className="fas fa-sign-out-alt"></i>
                </span>
                <span className="title">Cerrar Sesion</span>
              </Link>
            </li>
          </ul>
        </div>
        {/* <div className="navbar__footer">
          <a className="navbar__logout">
            cerrar sesion
            <i className="fas fa-sign-out-alt"></i>
          </a>
        </div> */}
        <div
          onClick={manipulateInterface}
          id="toggleMenu"
          className="toggleMenu"
        ></div>
      </div>
    </div>
  );
};
