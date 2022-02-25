import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logoNova from './../templatePics/logoNovaSmall.png';
import bg from './../templatePics/bg.jpg';
import bgwhite from './../templatePics/logoNovaWhite.png';
import $ from 'jquery';
import { fetchWithOutToken, fetchWithToken } from '../helpers/fetchWithOutToken';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper';

export const Index = () => {
  const [banners, setBanners] = useState([]);
  useEffect(async () => {
    const res = await fetchWithOutToken('banners');
    const body = await res.json();
    setBanners(body.data.banners);
  }, []);

  return (
    <div className="index">
      <div className="welcome flex justify-around items-center p-2 bg-gray-800 text-white">
        <div className="">
          <span>Horario de atención: Lunes‑Viernes 09:30‑17:30</span>
        </div>

        <div className="follow-us flex justify-center items-center gap-2 ">
          {/* <span className="text-white text-lg">SEGUINOS</span> */}
          <Link to="#">
            <i className="fab fa-facebook w-6 text-lg hover:text-2xl h-6 rounded-full hover:shadow-md hover:bg-blue-600 shadow bg-blue-500 flex items-center justify-center text-white"></i>
          </Link>
          <Link to="#">
            <i className="fab fa-instagram w-6 text-lg hover:text-2xl h-6 rounded-full hover:shadow-md hover:bg-red-600 shadow bg-red-500 flex items-center justify-center text-white"></i>
          </Link>
          {/* <Link to="#">
            <i class="fab fa-twitter w-6 text-lg hover:text-2xl h-6 rounded-full hover:shadow-md hover:bg-blue-600 shadow bg-blue-500 flex items-center justify-center text-white"></i>
          </Link> */}
        </div>
        <div className="">
          <a href="tel:123-456-7890">
            <span className="flex gap-1">
              {/* <span>Llámanos</span> */}
              <i className="fab fa-whatsapp w-6 text-lg hover:text-2xl h-6 rounded-full hover:shadow-md hover:bg-green-600 shadow bg-green-500 flex items-center justify-center text-white"></i>{' '}
              : +54 9 3424 38-2961
            </span>
          </a>
        </div>
      </div>
      <div className="flex justify-between p-2 items-center z-20 gap-2 w-full bg-gray-100 sticky top-0">
        <div className="flex gap-3 justify-around items-center">
          <div
            onClick={() => {
              $('.menu-index').toggleClass('active');
            }}
            className="md:hidden cursor-pointer toggle-menu-index "
          >
            <i className="fas fa-bars text-lg text-red-500 hover:text-red-700"></i>
          </div>
          <div className="logo">
            <Link to="/index">
              <img src={logoNova} width={100} alt="Logo Nova" />
            </Link>
          </div>
          <ul className="menu-index flex menu-index justify-center items-center gap-3 ml-10">
            <li className="hover:text-pink-600">
              <a href="#home">Inicio</a>
            </li>
            <li className="hover:text-pink-600">
              <a href="#services">Servicios</a>
            </li>
            <li className="hover:text-pink-600">
              <a href="#about">Sobre Nosotros</a>
            </li>
            <li className="hover:text-pink-600">
              <a href="#contact">Contactanos</a>
            </li>
            <li className="hover:text-pink-600">
              <NavLink to="/work/check"> Consulta un Equipo </NavLink>
            </li>
            <div className="register-menu-mobile hidden">
              <Link className="btn bg-red-700  text-white shadow jhm-shadow p-2 " to="/register">
                Registrarse
              </Link>
            </div>
          </ul>
        </div>
        <div className="btn-login-btn-register">
          <Link className="p-1 text-lg hover:text-pink-700 hover:underline text-pink-600  m-2" to="/login">
            Inicia Session
          </Link>
          <Link className="btn bg-red-700 btn-register text-white shadow jhm-shadow p-2  m-2" to="/register">
            Registrarse
          </Link>
        </div>
      </div>

      {/* //banner  */}
      {/* <div className="banner  w-11/12 my-2 m-auto " id="banner"> */}
      {/* <div id="banner-content-imgs" className="banner-content items-center relative flex"> */}
      <Swiper
        pagination={{
          type: 'fraction',
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper sm:h-72 my-1"
      >
        {banners.map((b) => (
          <SwiperSlide>
            <img src={b.photo} alt={b.id} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* </div> */}
      {/* </div> */}

      {/* //services  */}
      <div className="services w-11/12 p-4  my-2 m-auto bg-white shadow-lg " id="services">
        <h3 className="title-services !text-3xl sm:!text-6xl  title-form">Servicios</h3>
        <div className="services-content p-3  gap-2 justify-center items-center">
          <div className="card-service hover:shadow cursor-pointer  rounded shadow-md ">
            <div className="img">
              <img src={bg} alt="" />
            </div>
            <div className="card-footer bg-gray-100 flex items-center justify-center">
              <span>Reparación de Iphone </span>
            </div>
          </div>
          <div className="card-service hover:shadow cursor-pointer  rounded shadow-md">
            <div className="img">
              <img src={bg} alt="" />
            </div>
            <div className="card-footer  bg-gray-800 text-white flex items-center justify-center text-center">
              <span>Smart Watch - Ipad - Mac Book </span>
            </div>
          </div>
          <div className="card-service hover:shadow cursor-pointer  rounded shadow-md">
            <div className="img">
              <img src={bg} alt="" />
            </div>
            <div className="card-footer  bg-pink-700 text-white flex items-center justify-center">
              <span>Venta de equipos Nuevos-Usados </span>
            </div>
          </div>
          <div className="card-service hover:shadow cursor-pointer  rounded shadow-md bg-sky-800">
            <div className="img">
              <img src={bg} alt="" />
            </div>
            <div className="card-footer bg-yellow-700 text-white flex items-center justify-center">
              <span>Reparación de Celulares Android </span>
            </div>
          </div>
        </div>
      </div>

      {/* about us */}
      <div className="about-us w-11/12 p-4  my-4 m-auto bg-white shadow-lg" id="about">
        <h3 className="title-services !text-3xl sm:!text-6xl  title-form">Acerca de Nosotros</h3>
        <div className="about-us-content grid md:grid-cols-2 sm:grid-cols-1 justify-between gap-3 p-2 my-2 items-center">
          <div className="about-text bg-gray-100 shadow-lg rounded-sm p-2">
            <p className="first-letter:text-6xl first-letter:text-pink-700 first-line:tracking-widest">
              Somos una empresa con varios años de trayectoria. Nos dedicamos a todo lo que se refiera a reparaciones de
              telefonía celular e IPads. Realizamos todo lo que son cambio de piezas de diferentes marcas (Samsung,
              Motorola, Xiaomi, entre otras) y iPhone Trabajamos con los repuestos de la máxima calidad que se
              encuentran en el mercado para poder asegurarle al cliente una reparación exitosa y una experiencia de
              usuario igual a la que lo sorprendió al usar su equipo por primera vez.
            </p>
          </div>
          <div className="img-about-us flex justify-center items-center p-2">
            <img src={bg} style={{ width: '100%' }} alt="" />
          </div>
        </div>
      </div>

      {/* map */}
      <div className="mapa-box w-11/12 p-4  my-4 m-auto bg-white shadow-lg">
        <h3 className="title-form  !text-3xl sm:!text-6xl">Cómo llegar </h3>
        <div className="mapa">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4039.7410697230857!2d-60.648348477213965!3d-32.943045974707616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b7ab3dcfa636eb%3A0xf8d408ba1fff4aad!2sSan%20Lorenzo%201636%2C%20S2000ART%20Rosario%2C%20Santa%20Fe!5e0!3m2!1sen!2sar!4v1643655150414!5m2!1sen!2sar"
            // width="550"
            // height="500"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* footer */}
      <div className="footer-index  bg-gray-900 justify-items-center ">
        <div className="footer-index-container flex flex-wrap gap-y-4 gap-2 justify-around  items-center p-2">
          <div className="logo-footer flex items-center jsujtify-center h-full">
            <img src={bgwhite} alt="LOGO NOVA" width={100} />
          </div>
          <ul className="flex flex-col sm:flex-row menu-index-footer justify-start text-white  items-start gap-3  text-left">
            <li className="hover:text-pink-600">
              <a href="#home">Inicio</a>
            </li>
            <li className="hover:text-pink-600">
              <a href="#services">Servicios</a>
            </li>
            <li className="hover:text-pink-600">
              <a href="#about">Sobre Nosotros</a>
            </li>
            <li className="hover:text-pink-600">
              <a href="#contact">Contactanos</a>
            </li>
          </ul>
          <div className="text-white">
            <span> &copy; Nova Technology 2022 </span>
          </div>
        </div>
        <hr />
        <div className="follow-us flex justify-center items-center gap-2 mt-3 p-2">
          <span className="text-white text-lg">SEGUINOS</span>
          <Link to="#">
            <i className="fab fa-facebook w-6 text-lg hover:text-2xl h-6 rounded-full hover:shadow-md hover:bg-blue-600 shadow bg-blue-500 flex items-center justify-center text-white"></i>
          </Link>
          <Link to="#">
            <i className="fab fa-instagram w-6 text-lg hover:text-2xl h-6 rounded-full hover:shadow-md hover:bg-red-600 shadow bg-red-500 flex items-center justify-center text-white"></i>
          </Link>
          {/* <Link to="#">
            <i class="fab fa-twitter w-6 text-lg hover:text-2xl h-6 rounded-full hover:shadow-md hover:bg-blue-600 shadow bg-blue-500 flex items-center justify-center text-white"></i>
          </Link> */}
        </div>
      </div>
    </div>
  );
};
