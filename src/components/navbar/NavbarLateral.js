import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogout } from '../../action/authAction';
import NavaLogoWhite from '../../templatePics/logoNovaWhite.png';

const NavbarLateral = ({ history }) => {
  const { role } = useSelector((state) => state.auth);

  useLayoutEffect(() => {
    // console.log();
    if (history.location.pathname === '/') {
      document.querySelector('.link-lateral-home')?.classList.add('active');
    }
    if (history.location.pathname === '/browse') {
      document.querySelector('.link-lateral-browse')?.classList.add('active');
    }
    if (history.location.pathname.includes('/works') && history.location.pathname.length === 6) {
      document.querySelector('.link-lateral-works')?.classList.add('active');
    }
    if (history.location.pathname.includes('/clients')) {
      document.querySelector('.link-lateral-clientes')?.classList.add('active');
    }
    if (history.location.pathname.includes('/client/add')) {
      document.querySelector('.link-lateral-client-add')?.classList.add('active');
    }
    if (history.location.pathname.includes('/work/add')) {
      document.querySelector('.link-lateral-work-add')?.classList.add('active');
    }
    if (history.location.pathname.includes('/histories')) {
      document.querySelector('.link-lateral-histories')?.classList.add('active');
    }
    if (history.location.pathname.includes('/createquery')) {
      document.querySelector('.link-lateral-create-query')?.classList.add('active');
    }
  }, [history.location.pathname]);

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
    <div className="navbar active-mini-menu">
      <div className="navbar__container">
        <i onClick={handleNavbar} id="btn-close-mobil" className="fas fa-times"></i>
        <div className="navegation">
          <div className="navegation-header">
            <i onClick={manipulateInterface} className="fas fa-bars"></i>
            <div className="img">
              <img src={NavaLogoWhite} alt="Logo Nova" width="25" />
            </div>
          </div>
          <ul id="menu-lateral-big" className="menu-lateral">
            {role === 'user' && (
              <>
                <li className="menu-item link-lateral link-lateral-browse">
                  <span className="cartel">Inicio</span>
                  <Link to="/browse" className="">
                    <span className="icon">
                      <i className="fas fa-home"></i>
                    </span>
                    <span className="title">Inicio</span>
                  </Link>
                </li>
                <li className="menu-item link-lateral link-lateral-create-query">
                  <span className="cartel">Consultas</span>
                  <Link to="/createquery" className="">
                    <span className="icon">
                      <i className="fas fa-question"></i>
                    </span>
                    <span className="title"> Consulta </span>
                  </Link>
                </li>
              </>
            )}

            {role !== 'user' && (
              <>
                <li className="menu-item link-lateral link-lateral-home">
                  <span className="cartel">Inicio</span>
                  <Link to="/" className="">
                    <span className="icon">
                      <i className="fas fa-home"></i>
                    </span>
                    <span className="title">Inicio</span>
                  </Link>
                </li>
                <li className="menu-item link-lateral link-lateral-clientes">
                  <span className="cartel">Clientes</span>
                  <Link to="/clients">
                    <span className="icon">
                      <i className="fas fa-users"></i>{' '}
                    </span>
                    <span className="title">Clientes</span>
                  </Link>
                </li>
                <li className="menu-item link-lateral link-lateral-works">
                  <span className="cartel">Trabajos</span>
                  <Link to="/works">
                    <span className="icon">
                      <i className="fas fa-th-list"></i>
                    </span>
                    <span className="title">Trabajos</span>
                  </Link>
                </li>

                <li className="menu-item link-lateral link-lateral-client-add">
                  <span className="cartel">Agregar Cliente</span>
                  <Link to="/client/add">
                    <span className="icon">
                      <i className="fas fa-plus-circle"></i>
                    </span>
                    <span className="title">Agregar Cliente</span>
                  </Link>
                </li>
                <li className="menu-item link-lateral link-lateral-work-add">
                  <span className="cartel">Agregar Trabajo</span>

                  <Link to="/work/add">
                    <span className="icon">
                      <i className="fas fa-calendar-plus"></i>
                    </span>
                    <span className="title">Agregar Trabajo</span>
                  </Link>
                </li>

                {role === 'admin' && (
                  <li className="menu-item link-lateral link-lateral-histories ">
                    <span className="cartel">Historial de Trabajo</span>

                    <Link to="/histories">
                      <span className="icon">
                        <i className="fas fa-history"></i>{' '}
                      </span>
                      <span className="title">Hist. Trab/Gastos</span>
                    </Link>
                  </li>
                )}
              </>
            )}
            {/* <div id="marker" className="marker"></div> */}

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

export default NavbarLateral;
