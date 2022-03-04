import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createWork, getAllWorks } from '../../action/worksAction';
import { useForm } from '../../hooks/useForm';
import { startGettingAllClient } from '../../action/clientsAction';
import { GetStates } from '../../helpers/getStates';

const AddWork = ({ history }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startGettingAllClient());
  }, [dispatch]);

  const { clients } = useSelector((state) => state.clients);
  const [errores, setErrores] = useState([]);
  const [patronError, setPatronError] = useState(false);
  const [checkPassword, setCheckPassword] = useState(false);
  const [checkPatron, setCheckPatron] = useState(false);
  const [tiene_Contrasena] = useState(false);
  const [es_patron] = useState(false);
  const [passwordPatron, setContraseña] = useState('');
  const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [estados, setEstados] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function GetAllState() {
      const states = await GetStates();
      setEstados(states.data.states);
    }
    GetAllState();
  }, [setEstados]);

  const [values, handleInputChange, reset] = useForm({
    marca: '',
    modelo: '',
    emei: '',
    estado: '',
    precio: 0,
    descuento: 0,
    fachasEncontradas: '',
    observaciones: '',
    descripcion: '',
    recargo: 0,
    cliente: '',
    fechaFin: null,
    tieneContrasena: tiene_Contrasena,
    esPatron: es_patron,
    contrasena: '',
    patron: '',
    total: 0,
  });

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
    cliente,
    esPatron,
    tieneContrasena,
    contrasena,
    patron,
  } = values;

  const changeCheckPassword = (e) => {
    if (e.target.checked) {
      setCheckPassword(true);
      values.tieneContrasena = true;
    } else {
      setCheckPassword(false);
      values.tieneContrasena = false;
      values.contrasena = '';
    }
  };
  const changeCheckPatron = (e) => {
    if (e.target.checked) {
      setCheckPatron(true);
      values.esPatron = true;
      values.contrasena = '';
      document.querySelector('#input-password').classList.add('hidden');
    } else {
      values.contrasena = '';
      values.patron = '';
      setContraseña('');
      setCheckPatron(false);
      values.esPatron = false;
      document.querySelector('#input-password').classList.remove('hidden');
    }
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    if (verifyForm()) {
      dispatch(createWork(values));
      reset();
      dispatch(getAllWorks());
      history.push(`/works`);
    }
    setLoading(false);
  };

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
    if (!cliente) {
      ok = false;
      errors.cliente = true;
    }
    if (!estado) {
      ok = false;
      errors.estado = true;
    }

    if (!observaciones || observaciones.trim().length === 0) {
      ok = false;
      errors.observaciones = true;
    }

    if (tieneContrasena) {
      if (!esPatron && contrasena.length === 0) {
        setPatronError(true);
        ok = false;
      } else {
        setPatronError(false);
      }
    }
    if (esPatron) {
      if (patron.length === 0) {
        setPatronError(true);
        ok = false;
      } else {
        setPatronError(false);
      }
    }
    setErrores(errors);
    if (ok) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="work-add 2xl:w-2/5 2xl:m-auto 2xl:my-4 my-4">
      <form
        onSubmit={handleSubmitLogin}
        encType="multipart/form-data"
        method="POST"
        className="work-add-form shadow-xl  w-4/5 bg-white p-4"
      >
        <h3 className="title-form">Agregar Trabajo</h3>
        <div className="grid-content">
          <div>
            <label>
              Marca
              <span className="text-red-600">*</span>
            </label>
            <input onChange={handleInputChange} value={marca} type="text" name="marca" placeholder="ingresa la marca" />
            {errores.marca ? (
              <h5 className="bg-red-100 text-red-800 p-2 my-2 text-center">La marca es obligatoria</h5>
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
              <h5 className="bg-red-100 text-red-800 p-2 my-2 text-center">El modelo es obligatoria</h5>
            ) : null}
          </div>

          <div>
            <label>
              Cliente
              <span className="text-red-600">*</span>
            </label>
            <div>
              <input
                type="text"
                value={cliente}
                onChange={handleInputChange}
                name="cliente"
                list="clientes"
                placeholder="ingresa nombre o dni "
              />
              <datalist name="cliente" id="clientes">
                <option value="" disabled>
                  Elegir un cliente
                </option>
                {clients.map((clt) => (
                  <option key={clt._id} value={clt._id}>
                    {clt.dni.toString() + ' - ' + clt.name}
                  </option>
                ))}
              </datalist>
            </div>
            {errores.cliente ? (
              <h5 className="bg-red-100 text-red-800 p-2 my-2 text-center">Debe seleccionar un cliente</h5>
            ) : null}
          </div>
          <div>
            <label>
              Estado
              <span className="text-red-600">*</span>
            </label>
            <select value={estado} onChange={handleInputChange} name="estado">
              <option value="" disabled>
                seleccionarEstado
              </option>
              {estados.map((est) => (
                <option key={est._id} value={est._id}>
                  {' '}
                  {est.name}{' '}
                </option>
              ))}
            </select>
            {errores.estado ? (
              <h5 className="bg-red-100 text-red-800 p-2 my-2 text-center">El estado es obligatorio</h5>
            ) : null}
          </div>
          <div>
            <label>Emei / Serie</label>
            <input
              onChange={handleInputChange}
              value={emei}
              type="text"
              name="emei"
              placeholder="ingrese el emei/nro serie "
            />
          </div>
          <div>
            <label>recargo</label>
            <input
              value={recargo}
              onChange={handleInputChange}
              type="text"
              name="recargo"
              placeholder="ingresa el % de recargo "
              min={0}
            />
          </div>
          <div>
            <label>precio</label>
            <input
              value={precio}
              onChange={handleInputChange}
              type="text"
              name="precio"
              placeholder="ingresa un precio "
              min={0}
            />
          </div>
          <div>
            <label>descuento</label>
            <input
              onChange={handleInputChange}
              type="text"
              name="descuento"
              value={descuento}
              placeholder="ingresa el % de descuento "
              min={0}
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
            placeholder="ingresa sintomas "
            name="observaciones"
          ></textarea>
          {errores.observaciones ? (
            <h5 className="bg-red-100 text-red-800 p-2 my-2 text-center">La(s) observaciones es obligatoria</h5>
          ) : null}
          <label>Falla(s) Detectada(s)</label>
          <textarea
            value={fachasEncontradas}
            onChange={handleInputChange}
            name="fachasEncontradas"
            placeholder="(opcional )ingresa los problemas detectadas despues de la Revisión  "
          />

          <label>Descripción del trabajo a realizar</label>
          <textarea
            value={descripcion}
            onChange={handleInputChange}
            placeholder="(opcional )Menciona los arreglos hechos "
            name="descripcion"
          />
        </div>
        <div className="flex items-center">
          <label className="labelPassword">¿Tienes contraseña ?</label>
          <input onClick={changeCheckPassword} name="tieneContrasena" className="checkPassword" type="checkbox" />
        </div>

        <br />
        {checkPassword && (
          <div className="">
            <div className="flex items-center mb-1">
              <label className="labelPassword">¿Es patron ?</label>
              <input onClick={changeCheckPatron} className="checkPatron" name="checkPatron" type="checkbox" />
            </div>

            <div id="input-password">
              <label>
                Contraseña <span className="text-red-500"> *</span>{' '}
              </label>
              <input
                value={contrasena}
                onChange={handleInputChange}
                name="contrasena"
                type="text"
                placeholder="ingresa su contraseña"
              />
            </div>
          </div>
        )}
        <br />
        {checkPatron && (
          <div className="patron grid grid-cols-3 gap-2 my-1">
            {numeros.map((n) => (
              <button
                type="button"
                key={n}
                onClick={(e) => {
                  setContraseña(passwordPatron + e.target.textContent);
                  values.patron = passwordPatron + e.target.textContent;
                  e.target.classList.add('bg-gray-800');
                  e.target.classList.add('text-gray-900');
                  e.target.classList.add('cursor-not-allowed');
                  e.target.classList.add('disabled');
                }}
                className=" flex  m-auto dat w-12 h-12  items-center text-white justify-center cursor-pointer hover:bg-blue-600 duration-500 rounded-full bg-red-600"
              >
                {n}
              </button>
            ))}
          </div>
        )}
        {patronError ? (
          <h5 className="bg-red-100 text-red-800 p-2 mt-4 text-center">La Contraseña es obligatoria</h5>
        ) : null}

        <br />
        {checkPatron ? (
          <div className="text-center text-gray-700 p-2 mb-3 my-2 w-full bg-gray-100 shadow rouded">
            {passwordPatron}
          </div>
        ) : null}

        <button className="btn bg-red-500 hover:bg-red-800 jhm-shadow" type="submit">
          {loading ? 'Espere...' : '  Agregar Trabajo'}
        </button>
      </form>
    </div>
  );
};
export default AddWork;
