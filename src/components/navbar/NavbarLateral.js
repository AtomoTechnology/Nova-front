import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogout } from '../../action/authAction';
import NavaLogoWhite from '../../templatePics/logoNovaWhite.png';

export const NavbarLateral = () => {
  const { role } = useSelector((state) => state.auth);

  const activeLink = (e) => {
    console.log('hereee.');
    const links = document.querySelectorAll('.link-lateral');
    // links.classList.toggle('active');
    // links.classList.add('hidden');
    links.forEach((el) => {
      el.classList.toggle('active');
      // console.log(el.classList);
    });
    console.log(links, links.length);
    // e.target.parentElement.parentElement.classList.toggle('active');
  };

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(startLogout());
  };
  const handleNavbar = () => {
    document.querySelector('.navbar').classList.toggle('active');
  };

  const manipulateInterface = () => {
    document.querySelector('.navbar').classList.toggle('active-mini-menu');
    document.querySelector('.content-principal').classList.toggle('toggleContentPrincipal');
    document.querySelector('.content-header').classList.toggle('toggleContentHeader');
  };
  return (
    <div className="navbar">
      <div className="navbar__container">
        <i onClick={handleNavbar} id="btn-close-mobil" className="fas fa-times"></i>
        <div className="navegation">
          <div className="navegation-header">
            <i onClick={manipulateInterface} class="fas fa-bars"></i>
            <div className="img">
              <img src={NavaLogoWhite} alt="Logo Nova" width="25" />
            </div>
          </div>
          <ul>
            <li className="menu-item link-lateral" onClick={activeLink}>
              <span className="cartel">Home</span>
              <Link to="/" className="">
                <span className="icon">
                  <i class="fas fa-home"></i>
                </span>
                <span className="title">Home</span>
              </Link>
            </li>

            {role !== 'user' && (
              <>
                <li className="menu-item link-lateral" onClick={activeLink}>
                  <span className="cartel">Clientes</span>
                  <Link to="/clients">
                    <span className="icon">
                      <i class="fas fa-users"></i>{' '}
                    </span>
                    <span className="title">Clientes</span>
                  </Link>
                </li>
                <li className="menu-item link-lateral" onClick={activeLink}>
                  <span className="cartel">Trabajos</span>
                  <Link to="/works">
                    <span className="icon">
                      <i className="fas fa-th-list"></i>
                    </span>
                    <span className="title">Trabajos</span>
                  </Link>
                </li>

                <li className="menu-item link-lateral" onClick={activeLink}>
                  <span className="cartel">Agregar Cliente</span>
                  <Link to="/client/add">
                    <span className="icon">
                      <i class="fas fa-plus-circle"></i>
                    </span>
                    <span className="title">Agregar Cliente</span>
                  </Link>
                </li>
                <li className="menu-item link-lateral" onClick={activeLink}>
                  <span className="cartel">Agregar Trabajo</span>

                  <Link to="/work/add">
                    <span className="icon">
                      <i class="fas fa-calendar-plus"></i>
                    </span>
                    <span className="title">Agregar Trabajo</span>
                  </Link>
                </li>

                {role === 'admin' && (
                  <li className="menu-item link-lateral" onClick={activeLink}>
                    <span className="cartel">Historial de Trabajo</span>

                    <Link to="/works/histories/all">
                      <span className="icon">
                        <i class="fas fa-history"></i>{' '}
                      </span>
                      <span className="title">Hist. Trab/Gastos</span>
                    </Link>
                  </li>
                )}
              </>
            )}

            {/* <li onClick={handleLogout} className="menu-item">
							<span className="cartel">Cerrar Sesion</span>

							<Link to="#">
								<span className="icon">
									<i className="fas fa-sign-out-alt"></i>
								</span>
								<span className="title">Cerrar Sesion</span>
							</Link>
						</li> */}
          </ul>
          <div className="navegation-footer">
            <li onClick={handleLogout} className="menu-item">
              <span className="cartel">Cerrar Sesion</span>

              <Link to="#">
                <span className="icon">
                  <i className="fas fa-sign-out-alt"></i>
                </span>
                <span className="title">Cerrar Sesion</span>
              </Link>
            </li>
          </div>
        </div>
        {/* <div className="navbar__footer">
          <a className="navbar__logout">
            cerrar sesion
            <i className="fas fa-sign-out-alt"></i>
          </a>
        </div> */}
        {/* <div
					onClick={manipulateInterface}
					id="toggleMenu"
					className="toggleMenu"
				></div> */}
      </div>
    </div>
  );
};
