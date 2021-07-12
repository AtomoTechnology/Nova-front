import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { filterWorksState, getAllWorks } from "../../action/worksAction";
import { useForm } from "../../hooks/useForm";
import { SmallLoading } from "../SmallLoading";
import { Work } from "./Work";

export const Works = () => {
  //array of state

  const [values, handleInputChange] = useForm({ estado: "" });
  const { estado } = values;
  const [codigo, setCodigo] = useState("");
  const [loadingWorks, setLoadingWorks] = useState(true);
  const [result, setResult] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllWorks());
    setLoadingWorks(false);
  }, [dispatch, estado]);
  let { works } = useSelector((state) => state.works);

  useEffect(() => {
    setResult(works);
    if (estado == "Todos" || estado == "") {
      setResult(works);
    } else {
      setResult(works.filter((w) => w.estado.name === estado));
    }
  }, [estado]);
  useEffect(() => {
    console.log(codigo);
    setResult(works);
    if (codigo !== "") {
      setResult(result.filter((w) => w.codigo.includes(codigo)));
    }
  }, [codigo]);
  const stateArray = [
    "Revision",
    "Presupuesto",
    "En Reparacion",
    "Terminado",
    "Entregado",
    "Todos",
  ];

  return (
    <div className="works ">
      <div className="search-box-all-works w-full overflow-hidden shadow my-2 p-2">
        <form className="flex w-full flex-wrap lg:justify-center gap-y-2 flex-col sm:flex-row md:justify-between items-center sm:gap-x-2">
          <select
            className="sm:rounded-full shadow  sm:w-min w-full"
            name="estado"
            onChange={handleInputChange}
            value={estado}
          >
            <option value="" disabled>
              Filtrar por estado
            </option>
            {stateArray.map((elem) => (
              <option key={elem} value={elem}>
                {elem}
              </option>
            ))}
          </select>
          <input
            name="codigo"
            className="shadow sm:rounded-full   sm:w-min w-full"
            value={codigo}
            onChange={(e) => {
              setCodigo(e.target.value);
            }}
            placeholder="Buscar codigo de trabajo"
            type="text"
          />
        </form>
      </div>
      {result.length === 0 && (
        <div className="message-result-empty hidden  bg-red-500 text-gray-100 p-2 my-2 w-12/12 shadow-md rounded text-center">
          No hay resultado para este filtro...
        </div>
      )}
      {loadingWorks ? (
        <SmallLoading />
      ) : works.length <= 0 && result.length <= 0 ? (
        <div className="">
          <div className="w-full mb-4 w-12/12 message-result-empty">
            <span className="bg-red-500 text-gray-100 p-2 ">
              No hay trabajo para mostrar por el momento...
            </span>
          </div>
          <Link
            className="h-32  p-2 border-2 rounded-full shadow-lg border-gray-200"
            to="/work/add"
          >
            Cargar Trabajo
          </Link>
        </div>
      ) : (
        <div className="works-grid p-1">
          {result.length <= 0
            ? works.map((work) => <Work key={work._id} work={work} />)
            : result.map((work) => <Work key={work._id} work={work} />)}
        </div>
      )}
    </div>
  );
};
