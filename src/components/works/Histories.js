import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { fetchWithToken } from '../../helpers/fetchWithOutToken';
import { useForm } from '../../hooks/useForm';
import { SmallLoading } from '../SmallLoading';
import { History } from './History';
import Swal from 'sweetalert2';
import { Gasto } from '../gastos/Gasto';
import { useDispatch, useSelector } from 'react-redux';
import { GetHistories } from '../../action/worksAction';
import $ from 'jquery';

const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});
const initialDate = moment(new Date()).format('YYYY-MM-DD');
const Histories = () => {
  const [startDate, setStartDate] = useState(initialDate);
  const [endDate, setEndDate] = useState(initialDate);
  const [loadingHistories, setLoadingHistories] = useState(true);
  const [gastos, setGastos] = useState([]);
  const [outGoingChange, setOutGoingChange] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    GetAll();
    getOutgoings();
  }, []);

  async function GetAll() {
    setLoadingHistories(true);
    await dispatch(GetHistories(startDate, endDate));
    setLoadingHistories(false);
  }

  const getOutgoings = async () => {
    const res = await fetchWithToken(`outgoings?startDate=${startDate}&endDate=${endDate}`);
    const body = await res.json();
    if (body.status === 'success') {
      setGastos(body.data.data);
    }
  };

  const { histories } = useSelector((state) => state.histories);

  const [values, handleInputChange, reset] = useForm({
    description: '',
    amount: 0,
  });
  const { description, amount } = values;

  const handleEndtDate = (e) => {
    setEndDate(e.target.value);
  };

  const handleStartDate = (e) => {
    setStartDate(e.target.value);
  };

  let total1 = 0;
  let gastostotal1 = 0;
  histories.map((wk) => {
    total1 += wk.total;
  });

  gastos.map((g) => {
    gastostotal1 += g.amount;
  });

  const openModalAddOutgoing = (e) => {
    document.querySelector('.add-outgoing-box').classList.toggle('active');
  };

  const agregarGasto = async (e) => {
    e.preventDefault();
    if (description != '' && amount != '' && description.length < 50) {
      const res = await fetchWithToken('outgoings', values, 'POST');
      const body = await res.json();
      if (body.status === 'success') {
        Toast.fire({
          icon: 'success',
          title: 'Gasto agregado con exito...',
        });
        reset();
        openModalAddOutgoing();
        getOutgoings();
      } else {
        Toast.fire({
          icon: 'error',
          title: body.message,
        });
      }
    } else {
    }
  };

  const toggleGastos = () => {
    document.querySelector('.gastos').classList.toggle('active');
  };

  const toggleEntregados = () => {
    document.querySelector('.work-entregados').classList.toggle('active');
  };

  const toggleFiterBox = (e) => {
    GetAll();
    getOutgoings();
    $('.search-histories').toggleClass('hidden');
  };
  const toggleFiterBox2 = (e) => {
    $('.search-histories').toggleClass('hidden');
  };

  return (
    <div>
      <div className="add-outgoing-box">
        <div className="add-outgoing-overlay" onClick={openModalAddOutgoing}></div>
        <div className="outgoing-content shadow">
          <div className="outgoing-header bg-green-700">
            <span>Agregar Gasto</span>
            <i onClick={openModalAddOutgoing} className="fas fa-times-circle"></i>
          </div>
          <div className="outgoing-body">
            <form onSubmit={agregarGasto}>
              <fieldset>
                <label htmlFor="description">Descripcion</label>
                <input type="text" name="description" onChange={handleInputChange} value={description} />
              </fieldset>
              <fieldset>
                <label htmlFor="amount">Costo</label>
                <input type="number" name="amount" onChange={handleInputChange} value={amount} />
              </fieldset>
              <fieldset className="outgoing-actions !flex flex-row justify-between items-center">
                <button className="shadow rounded bg-green-800" type="submit">
                  Agregar
                </button>
                <button className="shadow rounded bg-gray-800" type="button">
                  Cancelar
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
      <div>
        <span className="title-form !text-lg !mb-0 ml-1"> Filtrar </span>

        <i
          onClick={toggleFiterBox2}
          className="fas fa-sliders-h m-2 sticky text-white cursor-pointer   top-12 hover:bg-red-600 p-2 shadow-lg filter-toggle "
        ></i>
      </div>
      <div className="search search-histories h-fit w-full sm:!m-0 sm:top-12 sm:left-32 p-3 mt-2 hidden fixed sm:w-fit bg-white">
        <div className="flex flex-col gap-4 items-center  box-input-filter mb-2 justify-between">
          <div className="relative bg-gray-200 flex w-full p-2 justify-center items-center">
            <input
              className="text-gray-900 p-0 bg-gray-200  rounded-none cursor-pointer"
              type="Date"
              value={startDate}
              onChange={handleStartDate}
            />
          </div>
          <div className=" flex bg-gray-200 w-full p-2 justify-center items-center relative">
            <input
              className="text-gray-900 p-0 bg-gray-200  rounded-none cursor-pointer"
              type="Date"
              value={endDate}
              onChange={handleEndtDate}
            />
          </div>
          <button onClick={toggleFiterBox} className="btn w-full jhm-shadow bg-red-500">
            OK
          </button>
        </div>
      </div>

      {loadingHistories ? (
        <SmallLoading />
      ) : (
        <div className="">
          <div onClick={toggleEntregados} className="entregados-header gastos-header">
            <span>Trab. Entregados</span>
            <i className="fas fa-angle-double-down"></i>
          </div>
          <table className="shadow-md work-entregados active">
            <thead className="bg-green-400 p-3">
              <tr>
                <th>Codigo</th>
                <th>Marca/Modelo</th>
                {/* <th>Cliente</th> */}
                <th>Monto</th>
                <th>Fecha Entrega</th>
              </tr>
            </thead>
            <tbody>
              {histories.length <= 0 ? (
                <tr className="">
                  <td>... </td>
                  <td> ... </td>
                  <td> ... </td>
                  <td>...</td>
                </tr>
              ) : (
                histories.map((w) => <History key={w._id} work={w} />)
              )}
            </tbody>
          </table>
          <div onClick={toggleGastos} className="gastos-header">
            <span>Gastos</span>
            <i className="fas fa-angle-double-down"></i>
            <div onClick={openModalAddOutgoing} className="add-gastos-flotante cursor-pointer">
              <div to="#">
                <i className="fas fa-plus-circle"></i>
                <span className="agregar-gasto">Agregar Gastos</span>
              </div>
            </div>
          </div>
          <table className="shadow-md gastos">
            <thead className="bg-red-400 p-3 ">
              <tr>
                <th>Fecha</th>
                <th>Descripción</th>
                <th>Monto</th>
                <th>Borrar</th>
              </tr>
            </thead>
            <tbody>
              {gastos.map((gasto) => (
                <Gasto
                  key={gasto._id}
                  setOutGoingChange={setOutGoingChange}
                  outGoingChange={outGoingChange}
                  gasto={gasto}
                />
              ))}
            </tbody>
          </table>
          <div className="flex sticky bottom-0 justify-between p-2 bg-green-400 mt-1">
            <span>Ganancia : {' $ ' + total1} </span>
            <span>Gastos : {' $ ' + gastostotal1} </span>
            <span> Diferencias : {' $ ' + (total1 - gastostotal1)} </span>
          </div>
        </div>
      )}
    </div>
  );
};
export default Histories;
