import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";
import workFakeFoto from "../../templatePics/bg.jpg";
import userLogo from "../../templatePics/userLogo.png";

export const WorkState = ({ work }) => {
  let ahora = moment(moment().format("YYYY-MM-DD"));
  const { role } = useSelector((state) => state.auth);
  let color = "";
  switch (work?.state[work?.state.length - 1].nombre) {
    case "Revision":
      color = "red-700";
      break;
    case "Presupuesto":
      color = "gray-600";
      break;
    case "En Reparacion":
      color = "yellow-500";
      break;
    case "Terminado":
      color = "pink-400";
      break;
    default:
      color = "green-700";
      break;
  }
  return (
    <Link to={`/works/${work.work._id}`} className="work">
      {work?.work.images.length > 0 ? (
        <img
          style={{
            // width: 100,
            height: 150,
          }}
          className="rounded-t"
          src={`/assets/img/works/${work?.work.images[0]?.fileName}`}
        />
      ) : (
        <img
          style={{
            // width: 100,
            height: 150,
          }}
          className="rounded-t"
          src={workFakeFoto}
        />
      )}

      <div className="title p-1">
        <span className={"capitalize text-" + color}>
          {work?.work.marca + "   " + work?.work.modelo}
        </span>
      </div>
      <div className="observaciones p-1">
        <span>
          {work?.work.observaciones.slice(0, 100)}{" "}
          {work?.work.observaciones.length > 100 ? "..." : null}
        </span>
      </div>
      <div className="p-1">
        {" "}
        <p className="text-gray-300">
          {"Hace " +
            ahora.diff(
              moment(
                moment(work.state[work.state.length - 1].fecha).format(
                  "YYYY-MM-DD"
                )
              ),
              "days"
            ) +
            " Dias"}
        </p>
        <p>{work.work.codigo}</p>
      </div>
      <div className="estado p-1 flex justify-between items-center">
        <span className={`rounded-sm bg-${color} p-1`}>
          {work?.state[work?.state.length - 1].nombre}
        </span>
        <i className={" fas fa-mobile-alt mr-4 text-" + color}></i>
      </div>
      <div className="cliente-precio flex justify-between bg-gray-200 rounded-b p-1 items-center gap-2">
        {work?.work.cliente?.pathImg ? (
          <img
            className="rounded-full w-8 border-1 border-pink-500 h-8"
            src={`/assets/img/client/${work?.work.cliente?.pathImg}`}
          />
        ) : (
          <img
            className="rounded-full w-8 border-1 border-pink-500 h-8"
            src={userLogo}
          />
        )}
        <h3 className="capitalize font-serif">
          {work?.work.cliente?.name?.slice(0, 13)}...
        </h3>
        {role == "admin" && (
          <span className={"work-precio text-" + color}>
            {" $ " + work?.work.total.toFixed(2)}
          </span>
        )}
      </div>
    </Link>
  );
};
