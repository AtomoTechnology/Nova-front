import React from 'react';
import { Link } from 'react-router-dom';

export const Index = () => {

  // FIXME: do something there TODO: 
   return (
    <div className="taller-principal flex justify-center items-center gap-4 flex-col bg-gray-300 h-screen w-full">
      <span>
        ¿Ya tiene una cuenta ?
        <Link className="p-1 bg-green-500 shadow rounded text-xs m-2" to="/login">
          Inicia Session
        </Link>
      </span>
      <span className="text-xs">
        ¿Todavia no tiene cuenta ?
        <Link className="p-1 bg-pink-500 text-white shadow rounded  m-2" to="/register">
          Registrarse
        </Link>
      </span>
    </div>
  );
};
