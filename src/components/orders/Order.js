import moment from "moment";
import React, { useState } from "react";
import ReactPDF from "@react-pdf/renderer";
import { Loading } from "../Loading";
export const Order = ({ order }) => {
  const [loading, setLoading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  if (order.work === null) {
    return <div>Orden no existe ....</div>;
  }
  const {
    work: { marca, cliente },
  } = order;
  const generatePdf = async (e) => {
    setLoading(true);
    console.log(`${process.env.REACT_APP_URL}orders/${order?._id}`);
    const resp = await fetch(
      `${process.env.REACT_APP_URL}orders/${order?._id}`
    );
    const body = await resp.json();
    setLoading(false);
    console.log(body.ok);
    if (body.ok) {
      // alert("wee");
      // console.log(e.target.classList);
      // document.querySelector(".or" + order._id).classList.add("bg-green-500");
      // e.target.parentElement.classList.add("bg-pink-400");
    }
  };

  // if (loading) {
  //   return <Loading />;
  // }
  return (
    <div
      className={
        "ordertransform p-2 duration-500 flex flex-row justify-between gap-x-3 align-center cursor-pointer  hover:shadow-3xl or" +
        order._id
      }
    >
      <h3>{order._id}</h3>
      <h3>{moment(order.createAt).format("DD MM YYYY")}</h3>
      <h3>{cliente}</h3>
      <h3>{marca}</h3>
      {loading ? (
        <span>Descargando...</span>
      ) : (
        <i
          onClick={generatePdf}
          className="fas fa-arrow-circle-down text-white text-center text-lg  bg-red-300 shadow-md rounded-full flex align-center justify-center w-7 h-7"
        ></i>
      )}
    </div>
  );
};
