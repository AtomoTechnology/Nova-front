import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { startGettingAllClient } from "../action/clientsAction";
import { getAllWorks } from "../action/worksAction";
import moment from "moment";
import { WorkState } from "./works/WorkState";

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import { SmallLoading } from "./SmallLoading";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export const Home = () => {
  const dispatch = useDispatch();
  const [workStates, setWorkStates] = useState([]);
  const [loadingWorkState, setLoadingWorkState] = useState(true);
  useEffect(() => {
    dispatch(startGettingAllClient());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllWorks());
  }, [dispatch]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}work_state`)
      .then((res) => res.json())
      .then((data) => {
        setWorkStates(data.work_state);
        setLoadingWorkState(false);
      });
  }, [setLoadingWorkState, setWorkStates]);
  console.log(workStates);

  const { clients } = useSelector((state) => state.clients);
  const { works } = useSelector((state) => state.works);
  let ahora = moment(moment().format("YYYY-MM-DD"));
  const workWithoutChangeState = [];
  workStates.map((ws) => {
    let fecha = moment(
      moment(ws.state[ws.state.length - 1].fecha).format("YYYY-MM-DD")
    );
    if (
      ahora.diff(fecha, "days") >= 5 &&
      (ws.state[ws.state.length - 1].nombre == "Revision" ||
        ws.state[ws.state.length - 1].nombre == "Presupuesto")
    ) {
      workWithoutChangeState.push(ws);
    }
  });
  console.log(workWithoutChangeState);

  return (
    <div className="home">
      <div className="home__statistics shadow-md bg-gray-50 mb-2 p-1">
        {/* <h3>Estadisticas</h3> */}
        <div className="users">
          <div className="users-content rounded-t">
            <div className="content-left">
              <span>{clients.length}</span>
              <h3>clientes</h3>
            </div>
            <i className="fas fa-user"></i>
          </div>
          <div className="users-foot rounded-b">
            <Link to="clients">
              mas info<i className="fas fa-angle-double-right"></i>{" "}
            </Link>
          </div>
        </div>
        <div className="works">
          <div className="works-content rounded-t">
            <div className="content-left">
              <span>{works.length}</span>
              <h3>Trabajos</h3>
            </div>
            <i class="fas fa-th-list"></i>
          </div>
          <div className="works-foot rounded-b">
            <Link to="/works">
              mas info<i className="fas fa-angle-double-right"></i>{" "}
            </Link>
          </div>
        </div>
      </div>
      {!loadingWorkState ? (
        workWithoutChangeState.length > 0 && (
          <div className="home__section-recent-works shadow-lg my-1 p-2 rounded-md bg-gray-100">
            <h3 className="text-3xl p-1 mb-2 text-red-400">AVISO</h3>

            <Swiper
              spaceBetween={2}
              slidesPerView={3}
              navigation
              // pagination={{ clickable: true }}

              className="workStateWithoutChange p-2"
            >
              {workWithoutChangeState.map((wk) => (
                <SwiperSlide key={wk._id}>
                  <WorkState key={wk._id} work={wk} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )
      ) : (
        <SmallLoading />
      )}
    </div>
  );
};
