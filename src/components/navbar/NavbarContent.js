import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { startLogout } from "../../action/authAction";
// import logoUser from "../../asset/img/userLogo.png";
// import logoAdmin from "../../asset/img/adminLogo.png";

export const NavbarContent = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(startLogout());
  };

  const handleNavbar = () => {
    // document.querySelector(".navbar").classList.toggle("active-navbar");

    document.querySelector(".toggleMenu").classList.toggle("active");
    document.querySelector(".navbar").classList.toggle("active");
    document
      .querySelector(".content-principal")
      .classList.toggle("toggleContentPrincipal");
    document
      .querySelector(".content-header")
      .classList.toggle("toggleContentHeader");
  };
  const overMenuUser = () => {
    const menuUser = document.querySelector(".menu-user");
    menuUser.style.visibility = "visible";
    menuUser.style.opacity = 1;
  };
  const outMenuUser = () => {
    const menuUser = document.querySelector(".menu-user");
    menuUser.style.visibility = "hidden";
    menuUser.style.opacity = 0;
  };

  const { username, role } = useSelector((state) => state.auth);
  return (
    <div className="content-header">
      <i onClick={handleNavbar} className="fas fa-bars"></i>
      <div
        onMouseOut={outMenuUser}
        onMouseOver={overMenuUser}
        className="content-header-right"
      >
        <div className="user-logo">
          {role === "admin" ? (
            <img src="/assets/img/adminLogo.png" />
          ) : (
            <img src="/assets/img/userLogo.png" />
          )}

          <span className="user-name">{username}</span>
        </div>
        <div className="menu-user">
          <ul>
            <li onClick={handleLogout}>
              <Link to="/work/add">
                <span className="icon">
                  <i className="fas fa-sign-out-alt"></i>
                </span>
                <span className="title">Cerrar Sesion</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
