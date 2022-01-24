import React from 'react';
import { Link } from 'react-router-dom';
import logoNova from './../templatePics/logoNovaSmall.png';
import bg from './../templatePics/bg.jpg';

export const Index = () => {
  // FIXME: do something there TODO:
  return (
    <>
      <div className="flex justify-between p-2 items-center gap-2 w-full bg-gray-700 sticky top-0">
        <div className="flex gap-3 justify-around items-center">
          <div className="logo">
            <img src={logoNova} width={100} alt="Logo Nova" />
          </div>
          <ul className="flex justify-center items-center gap-3 ml-10">
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
        </div>
        <div className="btn-login-btn-register">
          <Link className="p-1 shadow text-pink-600 text-xs m-2" to="/login">
            Inicia Session
          </Link>
          <Link className="p-1 bg-pink-800 text-white shadow rounded  m-2" to="/register">
            Registrarse
          </Link>
        </div>
      </div>

      {/* //banner  */}
      <div className="banner w-full h-36 bg-pink-600 p-2 text-center">BANNNER</div>

      {/* //services  */}
      <div className="services p-1" id="services">
        <h3 className="title-services text-6xl text-center">Servicios</h3>
        <div className="services-content p-3  gap-2 justify-center items-center">
          <div className="card-service hover:shadow cursor-pointer  rounded shadow-md bg-red-800">
            <div className="img">
              <img src={bg} alt="" />
            </div>
            <div className="card-footer p-2 text-center">
              <span>Reparaciones de Celulares </span>
            </div>
          </div>
          <div className="card-service hover:shadow cursor-pointer  rounded shadow-md bg-red-800">
            <div className="img">
              <img src={bg} alt="" />
            </div>
            <div className="card-footer p-2 text-center">
              <span>Reparaciones de Celulares </span>
            </div>
          </div>
          <div className="card-service hover:shadow cursor-pointer  rounded shadow-md bg-red-800">
            <div className="img">
              <img src={bg} alt="" />
            </div>
            <div className="card-footer p-2 text-center">
              <span>Reparaciones de Celulares </span>
            </div>
          </div>
          <div className="card-service hover:shadow cursor-pointer  rounded shadow-md bg-red-800">
            <div className="img">
              <img src={bg} alt="" />
            </div>
            <div className="card-footer p-2 text-center">
              <span>Reparaciones de Celulares </span>
            </div>
          </div>
          <div className="card-service hover:shadow cursor-pointer  rounded shadow-md bg-red-800">
            <div className="img">
              <img src={bg} alt="" />
            </div>
            <div className="card-footer p-2 text-center">
              <span>Reparaciones de Celulares </span>
            </div>
          </div>
          <div className="card-service hover:shadow cursor-pointer  rounded shadow-md bg-red-800">
            <div className="img">
              <img src={bg} alt="" />
            </div>
            <div className="card-footer p-2 text-center">
              <span>Reparaciones de Celulares </span>
            </div>
          </div>
          <div className="card-service hover:shadow cursor-pointer  rounded shadow-md bg-red-800">
            <div className="img">
              <img src={bg} alt="" />
            </div>
            <div className="card-footer p-2 text-center">
              <span>Reparaciones de Celulares </span>
            </div>
          </div>
        </div>
      </div>

      {/* about us */}
      <div className="about-us" id="about">
        <h3 className="title-services text-6xl text-center">Servicios</h3>
        <div className="about-us-content">
          <div className="text">
            Somos una empresa con varios años de trayectoria. Nos dedicamos a todo lo que se refiera
            a reparaciones de telefonía celular e IPads. Realizamos todo lo que son cambio de piezas
            de diferentes marcas (Samsung, Motorola, Xiaomi, entre otras) y iPhone Trabajamos con
            los repuestos de la máxima calidad que se encuentran en el mercado para poder asegurarle
            al cliente una reparación exitosa y una experiencia de usuario igual a la que lo
            sorprendió al usar su equipo por primera vez.
          </div>
          <img src={bg} width={200} alt="" />
        </div>
      </div>
    </>
  );
};
