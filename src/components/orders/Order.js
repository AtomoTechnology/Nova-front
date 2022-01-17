import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import axios from 'axios';
import pdf3 from '../../templatePics/pdf/3.png';
export const Order = ({ order }) => {
  const [loading, setLoading] = useState(false);
  if (order.work === null) {
    return <div>Orden no existe ....</div>;
  }

  const generatePdf = async (e) => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_URL}orders/${order?._id}`, {})
      .then(() =>
        axios.get(`${process.env.REACT_APP_URL}orders/fetchPdf/download`, {
          responseType: 'blob',
        })
      )
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
        saveAs(pdfBlob, `${order.work?.codigo}.pdf`);
        setLoading(false);
      });
  };

  return (
    <div className="orden">
      <div className="photo">
        <img src={pdf3} alt="" />
      </div>
      <div className="body-pdf">
        <h3 className="codigo">{order.work?.codigo}</h3>
        <h5 className="marca"> {order.work?.marca} </h5>
        <h5 className="modelo"> {order.work?.modelo} </h5>
        <button onClick={generatePdf} className="btn-download-pdf">
          {loading ? (
            <span>Descargando...</span>
          ) : (
            <span className="flex justify-between gap-x-3 align-center  ">
              <span>Descargar</span>
              <i className="fas fa-arrow-circle-down text-white text-center text-lg  bg-blue-600 shadow-md rounded-full flex align-center justify-center w-7 h-7"></i>
            </span>
          )}
        </button>
      </div>
    </div>
  );
};
