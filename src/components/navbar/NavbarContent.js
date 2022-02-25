import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogout } from '../../action/authAction';
import userLogo from '../../templatePics/userLogo.png';
import userLogoAdmin from '../../templatePics/adminLogo.png';

const NavbarContent = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(startLogout());
  };

  const handleNavbar = () => {
    // document.querySelector(".navbar").classList.toggle("active-navbar");
    // document.querySelector(".toggleMenu").classList.toggle("active");
    document.querySelector('.navbar').classList.toggle('active');
    // document
    //   .querySelector(".content-principal")
    //   .classList.toggle("toggleContentPrincipal");
    // document
    //   .querySelector(".content-header")
    //   .classList.toggle("toggleContentHeader");
  };
  const overMenuUser = () => {
    const menuUser = document.querySelector('.menu-user');
    menuUser.style.visibility = 'visible';
    menuUser.style.opacity = 1;
  };
  const outMenuUser = () => {
    const menuUser = document.querySelector('.menu-user');
    menuUser.style.visibility = 'hidden';
    menuUser.style.opacity = 0;
  };
  const mobileToggle = (e) => {
    document.querySelector('.menu-user').classList.toggle('active-mobile');
  };
  const activeLink = (e) => {
    // e.target.parentElement.parentElement.classList.toggle('active');
  };

  const { username, role, uid } = useSelector((state) => state.auth);
  return (
    <div className="content-header">
      <i onClick={handleNavbar} id="btn-open-menu-mobile" className="fas fa-bars"></i>

      <div className="messages relative">
        <Link to="/queries" className="text-white">
          <span className="absolute top-0 right-0 flex items-center justify-center w-6 h-6  rounded-full text-white jhm-rounded text-center bg-red-500">
            9
          </span>
          <span className="icon text-white">
            <i id="" className="fas fa-envelope text-white"></i>
          </span>
        </Link>
      </div>

      <div onMouseOut={outMenuUser} onMouseOver={overMenuUser} onClick={mobileToggle} className="content-header-right">
        <div className="user-logo">
          {role === 'admin' ? (
            <img src={userLogoAdmin} alt="logo admin" />
          ) : (
            <img src={userLogo} alt="logo user commun" />
          )}

          <span className="user-name">{username.split(' ')[0]}</span>
        </div>
        <div className="menu-user">
          <ul>
            <li className="menu-item" onClick={activeLink}>
              <span className="cartel">Home</span>
              <Link to="/" className="">
                <span className="icon">
                  <i className="fas fa-home"></i>
                </span>
                <span className="title">Home</span>
              </Link>
            </li>

            {role !== 'user' && (
              <>
                <li className="menu-item" onClick={activeLink}>
                  <span className="cartel">Clientes</span>
                  <Link to="/clients">
                    <span className="icon">
                      <i className="fas fa-users"></i>{' '}
                    </span>
                    <span className="title">Clientes</span>
                  </Link>
                </li>
                <li className="menu-item" onClick={activeLink}>
                  <span className="cartel">Trabajos</span>
                  <Link to="/works">
                    <span className="icon">
                      <i className="fas fa-th-list"></i>
                    </span>
                    <span className="title">Trabajos</span>
                  </Link>
                </li>

                <li className="menu-item" onClick={activeLink}>
                  <span className="cartel">Agregar Cliente</span>
                  <Link to="/client/add">
                    <span className="icon">
                      <i className="fas fa-plus-circle"></i>
                    </span>
                    <span className="title">Agregar Cliente</span>
                  </Link>
                </li>
                <li className="menu-item" onClick={activeLink}>
                  <span className="cartel">Agregar Trabajo</span>

                  <Link to="/work/add">
                    <span className="icon">
                      <i className="fas fa-calendar-plus"></i>
                    </span>
                    <span className="title">Agregar Trabajo</span>
                  </Link>
                </li>
                {role === 'admin' && (
                  <li className="menu-item link-lateral" onClick={activeLink}>
                    <span className="cartel">Historial de Trabajo</span>

                    <Link to="/works/histories/all">
                      <span className="icon">
                        <i className="fas fa-history"></i>{' '}
                      </span>
                      <span className="title">Hist. Trab/Gastos</span>
                    </Link>
                  </li>
                )}

                <li className="menu-item">
                  <Link to="/banners">
                    <span className="icon">
                      <i className="fas fa-braille"></i>
                    </span>
                    <span className="title">Banners</span>
                  </Link>
                </li>
                <li className="menu-item" onClick={activeLink}>
                  <span className="cartel">Novedades</span>
                  <Link to="/news">
                    <span className="icon">
                      <i className="fas fa-star-and-crescent"></i>{' '}
                    </span>
                    <span className="title">Novedades</span>
                  </Link>
                </li>
              </>
            )}
            <hr></hr>
            <li className="menu-item" onClick={activeLink}>
              {/* <span className="cartel">Mis Datos</span> */}
              <Link to={`/clients/${uid}`}>
                <span className="icon">
                  <i className="fas fa-user-circle"></i>{' '}
                </span>
                <span className="title">Mis Datos</span>
              </Link>
            </li>

            <li onClick={handleLogout} className="menu-item">
              <span className="cartel">Cerrar Sesion</span>

              <Link to="#">
                <span className="icon">
                  <i className="fas fa-sign-out-alt"></i>
                </span>
                <span className="title">Cerrar Sesion</span>
              </Link>
            </li>
          </ul>
          {/* <ul>
						<li onClick={handleLogout}>
							<Link to="#">
								<span className="icon">
									<i className="fas fa-sign-out-alt"></i>
								</span>
								<span className="title">Cerrar Sesion</span>
							</Link>
						</li>
					</ul> */}
        </div>
      </div>
    </div>
  );
};

export default NavbarContent;
