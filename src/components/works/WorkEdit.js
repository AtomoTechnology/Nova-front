import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { getOneWork, startEditWork } from '../../action/worksAction';
import { fetchWithToken } from '../../helpers/fetchWithOutToken';
import { startGettingAllClient } from '../../action/clientsAction';

export const WorkEdit = ({ match, history }) => {
  const dispatch = useDispatch();
  const [errores, setErrores] = useState([]);
  const [patronError, setPatronError] = useState(false);
  const [checkPassword, setCheckPassword] = useState(false);
  const [checkPatron, setCheckPatron] = useState(false);
  const [tiene_Contrasena, setTieneContrasena] = useState(false);
  const [es_patron, setEs_patron] = useState(false);
  const [passwordPatron, setContraseña] = useState('');
  const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [estados, setEstados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    dispatch(startGettingAllClient());
  }, [dispatch]);
  const workId = match.params.id;

  useEffect(() => {
    dispatch(getOneWork(workId));
  }, [dispatch, workId]);

  const { work } = useSelector((state) => state.works);
  const { clients } = useSelector((state) => state.clients);
  const { role } = useSelector((state) => state.auth);
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
    cliente: work?.cliente._id,
    tieneContrasena: work?.tieneContrasena,
    esPatron: work?.esPatron,
    contrasena: work?.contrasena,
    patron: work?.patron,
    total: work?.total,
  });
  useEffect(async () => {
    const resp = await fetchWithToken('state');
    const states = await resp.json();
    setEstados(states.data.states);
  }, [setEstados]);
  console.log(work);

  //hacer un useEffect before destriction of the values
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
      // setPasswordRequired(false);
    }
  };
  console.log(esPatron, tieneContrasena);

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
      dispatch(startEditWork(values, workId));
      setReload(!reload);
      reset();
      setTimeout(() => {
        history.push(`/works/${workId}`);
      }, 1000);
      // reset();
      // history.push('/works');
      // window.location.replace('/works');
    } else {
      console.log(values, errores);
    }
    setLoading(false);
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
      if (!esPatron && contrasena.length == 0) {
        setPatronError(true);
        ok = false;
      } else {
        setPatronError(false);
      }
    }
    if (esPatron) {
      if (patron.length == 0) {
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
    <div className="work-add relative">
      <div className=" absolute left-0 top-0 text-center uppercase flex gap-2  ">
        <button
          onClick={() => {
            history.goBack();
          }}
        >
          Volver
        </button>
      </div>
      <h3>
        Editar Trabajo
        <span className="underline text-blue-600 ml-1">{work?.codigo}</span>
      </h3>
      <form
        onSubmit={handleSubmitLogin}
        encType="multipart/form-data"
        method="POST"
        className="work-add-form"
      >
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
              {/* <select
								value={cliente}
								onChange={handleInputChange}
								name="cliente"
							>
								<option value="" disabled>
									Elegir un cliente
								</option>
								{clients.map((clt) => (
									<option key={clt._id} value={clt._id}>
										{clt.dni.toString()}
									</option>
								))}
							</select> */}
              <input
                type="text"
                value={cliente}
                onChange={handleInputChange}
                name="cliente"
                list="clientes"
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
            <select value={estado} onChange={handleInputChange} name="estado">
              <option value="" disabled>
                seleccionarEstado
              </option>
              {estados.map((est) => (
                <option key={est._id} value={est._id}>
                  {est.name}
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
              Emei / Serie
              {/* <span className="text-red-600">*</span> */}
            </label>
            <input
              onChange={handleInputChange}
              value={emei}
              type="number"
              name="emei"
              min={1}
              minLength={25}
            />
            {/* {errores.emei ? (
							<h5 className="bg-red-100 text-red-800 p-2 my-2 text-center">
								El emei es obligatoria, debe tener 15 numeros
							</h5>
						) : null} */}
          </div>

          {role === 'admin' && (
            <>
              {' '}
              <div>
                <label>recargo</label>
                <input
                  value={recargo}
                  onChange={handleInputChange}
                  type="text"
                  name="recargo"
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
                  min={0}
                />
              </div>
            </>
          )}
        </div>
        <div>
          <label>
            Observaciones
            <span className="text-red-600">*</span>
          </label>
          <textarea value={observaciones} onChange={handleInputChange} name="observaciones">
            {' '}
          </textarea>
          {errores.observaciones ? (
            <h5 className="bg-red-100 text-red-800 p-2 my-2 text-center">
              La(s) observaciones es obligatoria
            </h5>
          ) : null}
          <label>Falla(s) Detectada(s)</label>
          <textarea
            value={fachasEncontradas}
            onChange={handleInputChange}
            name="fachasEncontradas"
          />

          <label>Descripción del trabajo a realizar</label>
          <textarea value={descripcion} onChange={handleInputChange} name="descripcion" />
        </div>

        {esPatron ? (
          <span> Patron : {patron} </span>
        ) : tieneContrasena ? (
          <span> Contraseña : {contrasena} </span>
        ) : (
          <span>Sin clave</span>
        )}

        <div className="flex items-center">
          <label className="labelPassword">¿Tienes contraseña ?</label>
          <input
            onClick={changeCheckPassword}
            name="tieneContrasena"
            className="checkPassword"
            type="checkbox"
          />
        </div>

        <br />
        {checkPassword && (
          <div className="">
            <div className="flex items-center mb-1">
              <label className="labelPassword">¿Es patron ?</label>
              <input
                onClick={changeCheckPatron}
                className="checkPatron"
                name="checkPatron"
                type="checkbox"
              />
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
              {/* {errores.withoutPassword ? (
                <h5 className="bg-red-100 text-red-800 p-2 my-2 text-center">
                  La Contraseña es obligatoria
                </h5>
              ) : null} */}
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
                  e.target.classList.add('bg-blue-600');
                  e.target.classList.add('text-gray-900');
                  e.target.classList.add('cursor-not-allowed');
                  e.target.classList.add('disabled');
                }}
                className=" flex justify-center m-auto dat w-12 h-12 flex items-center text-white justify-center cursor-pointer hover:bg-blue-600 duration-500 rounded-full bg-red-600"
              >
                {n}
              </button>
            ))}
          </div>
        )}
        {patronError ? (
          <h5 className="bg-red-100 text-red-800 p-2 mt-4 text-center">
            La Contraseña es obligatoria
          </h5>
        ) : null}

        <br />
        {checkPatron ? (
          <div className="text-center text-gray-700 p-2 mb-3 my-2 w-full bg-gray-100 shadow rouded">
            {passwordPatron}
          </div>
        ) : null}

        {/* <div className="my-2">
					<label
						htmlFor="loadImg"
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
						className="loadImage gap-x-2 hover:bg-gray-800 bg-gray-900 text-white cursor-pointer flex justify-between p-1 rounded align-center"
					>
						<i className="fas fa-plus-circle text-center align-center text-white text-3xl  flex rounded-full p-1 justify-between"></i>
						<span className="text-white"> Subir Foto</span>
					</label>
					{errores.files ? (
						<h5 className="bg-red-100 text-red-800 p-2 my-2 text-center">
							Debe subir por lo menos 2 images o ninguna
						</h5>
					) : null}
					<input
						id="loadImg"
						onChange={imageChange}
						type="file"
						className="hidden"
						name="file"
						multiple
						accept="image/*"
					/>
				</div>
				<div className="images grid gap-2 grid-cols-3 p-2 bg-gray-300 shadow rounded">
					<img className={'image0 w-32 '} />
					<img className={'image1  w-32'} />
					<img className={'image2  w-32'} />
				</div>
				<br /> */}

        <button className="btn" type="submit">
          {loading ? 'Espere...' : '  Guardar Trabajo '}
        </button>
      </form>
    </div>
  );
};