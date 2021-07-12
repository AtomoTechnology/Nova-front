import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneWork, startEditWork } from "../../action/worksAction";
import { useForm } from "../../hooks/useForm";
import { startGettingAllClient } from "../../action/clientsAction";
import { Link } from "react-router-dom";

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import { fetchWithToken } from "../../helpers/fetchWithOutToken";
import moment from "moment";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export const GetWork = ({ match, history }) => {
  const dispatch = useDispatch();
  // console.log(match.params.workId);
  useEffect(() => {
    dispatch(startGettingAllClient());
  }, [dispatch]);
  const { clients } = useSelector((state) => state.clients);
  const [l, setL] = useState(200);
  const { role } = useSelector((state) => state.auth);
  const [estados, setEstados] = useState([]);
  const [errores, setErrores] = useState([]);
  const [allStateWork, setAllStateWork] = useState([]);
  const [reload, setReload] = useState(false);
  // console.log(clients);
  const workId = match.params.workId;

  useEffect(() => {
    dispatch(getOneWork(workId));
  }, [dispatch]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}state`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setEstados(data.states);
      });
  }, [setEstados]);
  const { work } = useSelector((state) => state.works);
  const [values, handleInputChange, reset] = useForm({
    marca: work?.marca,
    modelo: work?.modelo,
    emei: work?.emei,
    estado: work?.estado._id,
    precio: work?.precio,
    descuento: work?.descuento,
    fachasEncontradas: work?.fachasEncontradas,
    observaciones: work?.observaciones,
    descripcion: work?.descripcion,
    recargo: work?.recargo,
    cliente: work?.cliente,
    fechaInicio: work?.fechaInicio,
    fechaFin: work?.fechaFin,
  });

  useEffect(async () => {
    const query = await fetchWithToken(`work_state/getStates/${workId}`);
    const ws = await query.json();
    if (ws.ok) {
      setAllStateWork(ws.workState.state);
    }
  }, [workId]);
  console.log(work);
  const {
    marca,
    modelo,
    emei,
    estado,
    precio,
    descuento,
    fachasEncontradas,
    descripcion,
    observaciones,
    recargo,
  } = values;
  const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  let color = "";
  switch (work?.estado.name) {
    case "Revision":
      color = "text-red-700";
      break;
    case "Presupuesto":
      color = "text-gray-400";
      break;
    case "En Reparación":
      color = "text-yellow-500";
      break;
    case "Terminado":
      color = "text-green-200";
      break;

    default:
      color = "text-green-500";
      break;
  }

  const handleObservaciones1 = (e) => {
    setL(work?.observaciones.length);
    e.target.classList.add("hidden");
    document.querySelector(".ver-menos").classList.remove("hidden");
  };

  const handleObservaciones2 = (e) => {
    setL(200);
    e.target.classList.add("hidden");
    document.querySelector(".ver-mas").classList.remove("hidden");
  };
  const handleEditWork = async (e) => {
    e.preventDefault();
    if (verifyForm()) {
      console.log(values);
      dispatch(startEditWork(values, workId));
      const query = await fetchWithToken(`work_state/getStates/${work?._id}`);
      const ws = await query.json();
      if (ws.ok) {
        setAllStateWork(ws.workState.state);
      }
      console.log(allStateWork);
      const ruta = `/works/${workId}`;
      reset();
      console.log(ruta);
      setReload(!reload);
      setTimeout(() => {
        document.querySelector("#editWork").style.display = "none";
        history.push(ruta);
      }, 1000);
    } else {
      console.log(errores);
    }
  };
  // varify the form values
  const verifyForm = () => {
    let ok = true;
    let errors = [];

    if (!marca || marca.trim().length === 0) {
      ok = false;
      errors.marca = true;
    }
    if (!modelo || modelo.trim().length === 0) {
      ok = false;
      errors.modelo = true;
    }
    if (!emei || emei.length === 0) {
      ok = false;
      errors.emei = true;
    }
    if (!estado) {
      ok = false;
      errors.estado = true;
    }
    if (!observaciones || observaciones.trim().length === 0) {
      ok = false;
      errors.observaciones = true;
    }

    setErrores(errors);
    if (ok) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="one-work relative">
      {role === "admin" && (
        <div className="absolute hover:bg-gray-200 rounded-full">
          <a
            href="#editWork"
            className="p-3 h-24 w-24 rounded-full text-white bg-red-600"
          >
            <i className="fas fa-pen"></i>
          </a>
        </div>
      )}
      <div className="one-work-grid">
        {work?.images.length > 0 ? (
          <Swiper
            spaceBetween={2}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            // scrollbar={{ draggable: false }}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
            className="oneWorkCarrousel"
          >
            {work?.images.map((img) => (
              <SwiperSlide key={img.fileName}>
                {" "}
                <img
                  key={img.fileName}
                  className=""
                  src={`/assets/img/works/${img.fileName}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <i
            className={
              " fas fa-mobile-alt flex justify-center items-center " + color
            }
          ></i>
        )}

        <div className="one-work-body grid grid-cols-2 grid-rows-2 gap-2">
          <div className="work-data shadow rounded bg-gray-400 p-1">
            <p>Codigo : {work?.codigo} </p>
            <p>Marca : {work?.marca} </p>
            <p>Modelo : {work?.modelo}</p>
            <p>Imei : {work?.emei}</p>
            <p>
              Estado:
              {work?.estado.name}
            </p>
            {work?.tieneContrasena && <p>Contraseña : {work?.contrasena}</p>}
          </div>
          <div className="client-data rounded shadow bg-blue-400 p-1">
            <img
              className="rounded-full h-12 w-12"
              src={`/assets/img/client/${work?.cliente?.pathImg}`}
            />
            <p>
              Cliente :{" "}
              <Link
                className="underline text-white"
                to={`/clients/${work?.cliente?._id}`}
              >
                {" "}
                {work?.cliente?.name}{" "}
              </Link>
            </p>
            <p>DNI : {work?.cliente?.dni}</p>
            <p>Celular 1 : {work?.cliente?.phone1}</p>
          </div>

          <div className="price-data rounded shadow bg-red-400 p-1">
            <p>Pecargo: {work?.recargo}</p>
            <p>Precio: {work?.precio}</p>
            <p>descuento: {work?.descuento}</p>
            <p>Total: {work?.total}</p>
          </div>

          <div className="price-data rounded shadow bg-red-400 p-1">
            <span className="text-white text-lg underline">
              Historiales de Estados{" "}
            </span>
            {allStateWork.map((stw) => (
              <p>
                {stw.nombre +
                  " - " +
                  moment(stw.fecha).format("DD-MM-YY hh:mm:ss a")}
              </p>
            ))}
          </div>

          {work?.fachasEncontradas && (
            <div className="trouble-data rounded shadow bg-green-400 p-1">
              <p>facha(s) Encontradas : {work?.fachasEncontradas}</p>
            </div>
          )}

          {work?.observaciones && (
            <div className="trouble-data transition duration-1000 ease-in-out rounded shadow bg-yellow-400 p-1">
              <p className="transition duration-1000 ease-in-out">
                Observaciones : <br /> {work?.observaciones.slice(0, l)}
                {work?.observaciones.length > 200 ? (
                  <span
                    onClick={handleObservaciones1}
                    className="ver-mas cursor-pointer text-white duration-500"
                  >
                    ...Ver Más
                  </span>
                ) : null}
                <span
                  onClick={handleObservaciones2}
                  className="ver-menos cursor-pointer text-pink-400 duration-500 hidden"
                >
                  ...Ver Menos
                </span>
              </p>
            </div>
          )}

          {work?.descripcion && (
            <div className="trouble-data rounded-md bg-pink-400 p-1">
              <p>
                descripcion : <br /> {work?.descripcion}
              </p>
            </div>
          )}
        </div>
      </div>

      {work?.esPatron && (
        <div className="patron grid grid-cols-2 p-2 shadow my-2">
          <div className="text-green-500 text-4xl text-center flex justify-center items-center">
            {work?.patron}
          </div>
          <div className="patron grid grid-cols-3 gap-2 my-1">
            {numeros.map((n) => (
              <button
                type="button"
                key={n}
                className={
                  work?.patron.includes(n)
                    ? "bg-green-700  w-8 h-8 flex justify-center items-center hover:bg-green-400 duration-600 "
                    : "bg-gray-200  w-8 h-8 flex justify-center items-center hover:bg-green-400  duration-600"
                }
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      )}
      <div id="editWork" className="overlay">
        <a href="#" className="close-modal"></a>
        <div className="modal-edit-work">
          <h3>Agregar Trabajo</h3>
          <form onSubmit={handleEditWork} className="work-edit-form">
            <div className="grid-content">
              <div>
                <label>
                  Marca
                  <span className="text-red-600">*</span>
                </label>
                <input
                  onChange={handleInputChange}
                  value={marca}
                  type="text"
                  name="marca"
                  placeholder="ingresa la marca"
                />
                {errores.marca ? (
                  <h5 className="bg-red-100 text-red-800 p-2 my-2 text-center">
                    La marca es obligatoria
                  </h5>
                ) : null}
              </div>
              <div>
                <label>
                  Modelo
                  <span className="text-red-600">*</span>
                </label>
                <input
                  onChange={handleInputChange}
                  value={modelo}
                  type="text"
                  name="modelo"
                  placeholder="ingresa el modelo"
                />
                {errores.modelo ? (
                  <h5 className="bg-red-100 text-red-800 p-2 my-2 text-center">
                    El modelo es obligatoria
                  </h5>
                ) : null}
              </div>

              <div>
                <label>
                  Cliente
                  <span className="text-red-600">*</span>
                </label>
                <div>
                  <input readOnly value={work?.cliente.dni} />
                </div>
                {errores.cliente ? (
                  <h5 className="bg-red-100 text-red-800 p-2 my-2 text-center">
                    Debe seleccionar un cliente
                  </h5>
                ) : null}
              </div>
              <div>
                <label>
                  Estado
                  <span className="text-red-600">*</span>
                </label>
                <select
                  value={estado}
                  onChange={handleInputChange}
                  name="estado"
                >
                  <option value="" disabled>
                    seleccionarEstado
                  </option>
                  {estados.map((est) => (
                    <option key={est._id} value={est._id}>
                      {" "}
                      {est.name}{" "}
                    </option>
                  ))}
                </select>
                {errores.estado ? (
                  <h5 className="bg-red-100 text-red-800 p-2 my-2 text-center">
                    El estado es obligatorio
                  </h5>
                ) : null}
              </div>
              <div>
                <label>
                  Emei
                  <span className="text-red-600">*</span>
                </label>
                <input
                  onChange={handleInputChange}
                  value={emei}
                  type="number"
                  name="emei"
                />
                {errores.emei ? (
                  <h5 className="bg-red-100 text-red-800 p-2 my-2 text-center">
                    El emei es obligatoria
                  </h5>
                ) : null}
              </div>
              <div>
                <label>recargo</label>
                <input
                  value={recargo}
                  onChange={handleInputChange}
                  type="number"
                  name="recargo"
                />
              </div>
              <div>
                <label>
                  precio
                  {/* <span className="text-red-600">*</span> */}
                </label>
                <input
                  value={precio}
                  onChange={handleInputChange}
                  type="number"
                  name="precio"
                />
              </div>
              <div>
                <label>descuento</label>
                <input
                  onChange={handleInputChange}
                  type="number"
                  name="descuento"
                  value={descuento}
                />
              </div>
            </div>
            <div>
              <label>
                Observaciones
                <span className="text-red-600">*</span>
              </label>
              <textarea
                value={observaciones}
                onChange={handleInputChange}
                name="observaciones"
              >
                {" "}
              </textarea>

              <label>Facha(s) Detectada(s)</label>
              <textarea
                value={fachasEncontradas}
                onChange={handleInputChange}
                name="fachasEncontradas"
              />

              <label>Descripción del trabajo a realizar</label>
              <textarea
                value={descripcion}
                onChange={handleInputChange}
                name="descripcion"
              />
            </div>

            <br />

            <button className="btn" type="submit">
              Editar Trabajo
            </button>
          </form>
          <a href="#" className="close">
            x
          </a>
        </div>
      </div>
    </div>
  );
};
