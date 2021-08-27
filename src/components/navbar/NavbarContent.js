import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogout } from '../../action/authAction';
import userLogo from '../../templatePics/userLogo.png';
import userLogoAdmin from '../../templatePics/adminLogo.png';
// import logoUser from "../../asset/img/userLogo.png";
// import logoAdmin from "../../asset/img/adminLogo.png";

export const NavbarContent = () => {
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
		const menuUser = document
			.querySelector('.menu-user')
			.classList.toggle('active-mobile');

		// if (
		// 	menuUser.style.visibility === 'visible' &&
		// 	menuUser.style.opacity == 1
		// ) {
		// 	console.log('visible');
		// 	menuUser.style.visibility = 'hidden';
		// 	menuUser.style.opacity = 0;
		// } else {
		// 	console.log('not bisble');
		// 	menuUser.style.visibility = 'visible';
		// 	menuUser.style.opacity = 1;
		// }
	};
	const activeLink = (e) => {
		e.target.parentElement.parentElement.classList.toggle('active');
		console.log((e.target.parentElement.parentElement.style.display = 'none'));
	};

	const { username, role } = useSelector((state) => state.auth);
	return (
		<div className="content-header">
			<i
				onClick={handleNavbar}
				id="btn-open-menu-mobile"
				className="fas fa-bars"
			></i>
			<div
				onMouseOut={outMenuUser}
				onMouseOver={overMenuUser}
				onClick={mobileToggle}
				className="content-header-right"
			>
				<div className="user-logo">
					{role === 'admin' ? (
						<img src={userLogoAdmin} />
					) : (
						<img src={userLogo} />
					)}

					<span className="user-name">{username}</span>
				</div>
				<div className="menu-user">
					<ul>
						<li className="menu-item link-lateral active" onClick={activeLink}>
							<span className="cartel">Home</span>
							<Link to="/" className="">
								<span className="icon">
									<i class="fas fa-home"></i>
								</span>
								<span className="title">Home</span>
							</Link>
						</li>
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
						{role === 'admin' && (
							<li className="menu-item link-lateral" onClick={activeLink}>
								<span className="cartel">Registrar Usuario</span>
								<Link to="/auth/register">
									<span className="icon">
										<i className="fas fa-user-plus"></i>
									</span>
									<span className="title">Registar Usuario </span>
								</Link>
							</li>
						)}
						{role === 'admin' && (
							<li className="menu-item link-lateral" onClick={activeLink}>
								<span className="cartel">Ordenes</span>

								<Link to="/orders">
									<span className="icon">
										<i className="fas fa-th-list"></i>
									</span>
									<span className="title">Ordenes</span>
								</Link>
							</li>
						)}

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
						<li className="menu-item link-lateral" onClick={activeLink}>
							<span className="cartel">Historial de Trabajo</span>

							<Link to="/works/histories/all">
								<span className="icon">
									<i class="fas fa-history"></i>{' '}
								</span>
								<span className="title">Historial De Trabajo</span>
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
