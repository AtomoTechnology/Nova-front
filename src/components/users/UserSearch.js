import React from "react";
import { Link } from "react-router-dom";
// import logoUser from "../../asset/img/userLogo.png";

export const UserSearch = ({ clt }) => {
  return (
    <div>
      <Link
        to={`/clients/${clt._id}`}
        className="result-item text-gray-500 hover:bg-gray-200 duration-500  p-2 flex flex-row justify-between gap-x-2.5 items-center"
      >
        <img
          alt={clt?.name}
          className="w-8 h-8 rounded-full "
          src={`./assets/img/client/${clt?.pathImg}`}
        />
        <h3 className=" text-right">{clt?.dni}</h3>
        <h3 className="capitalize">{clt?.name}</h3>{" "}
      </Link>
    </div>
  );
};
