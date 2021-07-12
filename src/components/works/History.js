import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";

export const History = ({ work }) => {
  return (
    <div className="p-1 bg-gray-200 hover:text-white hover:bg-gray-800 duration-900 shadow flex items-center justify-between border-b-2 border-gray-500">
      <p className="text-green-500 flex-1 hover:text-green-400 hover:underline">
        <Link to={`/works/${work?._id}`}>{work?.codigo}</Link>
      </p>
      <p className="flex-1 p-2">{work?.marca + " - " + work.modelo}</p>
      <p className="flex-1 p-2 capitalize">{work?.cliente?.name}</p>
      <p className="flex-1 p-2">{"$ " + work?.precio}</p>
      <p className="flex-1 p-2">
        {moment(work.fechaInicio).format("DD-MM-YYYY")}
      </p>
    </div>
  );
};
