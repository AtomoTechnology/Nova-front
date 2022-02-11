import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getWorksClient, startGettingAllClient } from '../action/clientsAction';
import { getAllWorks } from '../action/worksAction';
import moment from 'moment';
import { WorkState } from './works/WorkState';
import { SmallLoading } from './SmallLoading';
import { WorkWithOut } from './works/WorkWithOut';
import { Work } from './works/Work';

export const Home = () => {
  const dispatch = useDispatch();
  const [workStates, setWorkStates] = useState([]);
  const [loadingWorkState, setLoadingWorkState] = useState(true);
  const { role, uid } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startGettingAllClient());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllWorks());
    setLoadingWorkState(false);
  }, [dispatch]);

  useEffect(() => {
    dispatch(getWorksClient(uid));
  }, []);

  const { clients, clientWorks } = useSelector((state) => state.clients);
  const { works, total } = useSelector((state) => state.works);

  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_URL}work_state`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setWorkStates(data.work_state);
  //       setLoadingWorkState(false);
  //     });
  // }, [setLoadingWorkState, setWorkStates]);

  var confirmWorks = [];
  works.forEach((cw) => {
    if (cw.estado.name === 'Terminado') {
      confirmWorks.push(cw);
    }
  });

  let ahora = moment(moment().format('YYYY-MM-DD'));
  // const workWithoutChangeState = [];
  // works.forEach((ws) => {
  //   let fecha = moment(moment(ws.states[ws.states.length - 1].fecha).format('YYYY-MM-DD'));
  //   if (
  //     ahora.diff(fecha, 'days') >= 3 &&
  //     (ws.states[ws.states.length - 1].nombre === 'Revision' ||
  //       ws.states[ws.states.length - 1].nombre === 'Presupuesto')
  //   ) {
  //     workWithoutChangeState.push(ws);
  //   }
  // });

  const workWithoutChangeState = [];

  for (let i = 0; i < works.length; i++) {
    let fecha = moment(
      moment(works[i].states[works[i].states.length - 1]?.fecha).format('YYYY-MM-DD')
    );
    if (
      ahora.diff(fecha, 'days') >= 3 &&
      (works[i].states[works[i].states.length - 1].nombre === 'Revision' ||
        works[i].states[works[i].states.length - 1].nombre === 'Presupuesto')
    ) {
      workWithoutChangeState.push(works[i]);
    }
  }

  const GoToTheLeft = (e) => {
    const carrouselLanguages = document.getElementById(
      e.target.parentElement.parentElement.classList[0]
    );

    carrouselLanguages.scrollLeft -= carrouselLanguages.offsetWidth;
  };
  const GoToTheRight = async (e) => {
    const carrouselLanguages = document.getElementById(
      e.target.parentElement.parentElement.classList[0]
    );
    carrouselLanguages.scrollLeft += carrouselLanguages.offsetWidth;
  };

  return role !== 'user' ? (
    <div className="home">
      <div className="home__statistics shadow bg-gray-50 mb-2 p-1">
        {/* <h3>Estadisticas</h3> */}
        <Link to="clients" className="users">
          <div className="users-content">
            <div className="content-left">
              <span>{clients.length}</span>
              <h3>Usuarios</h3>
            </div>
            <i className="fas fa-user text-gray-900"></i>
          </div>
        </Link>
        <Link to="works" className="works">
          <div className="works-content">
            <div className="content-left">
              <span>{total}</span>
              <h3>Trabajos</h3>
            </div>
            <i className="fas fa-th-list text-yellow-700"></i>
          </div>
        </Link>
        <a href="#worksaviso" className="works-avisos">
          <div className="works-content">
            <div className="content-left">
              <span>
                {loadingWorkState ? (
                  <SmallLoading text="" size="small" />
                ) : (
                  workWithoutChangeState.length
                )}
              </span>
              <h3>Avisos</h3>
            </div>
            <i className="fas fa-flag text-red-700"></i>
          </div>
        </a>
        <a href="#worksconfirm" className="works-confirm">
          <div className="works-content">
            <div className="content-left">
              <span>{confirmWorks.length}</span>
              <h3>Terminados</h3>
            </div>
            <i className="fas fa-calendar-check text-pink-400"></i>
          </div>
        </a>
      </div>
      {!loadingWorkState ? (
        workWithoutChangeState.length > 0 && (
          <div id="worksaviso" className="home__section-recent-works shadow my-1 p-2">
            <h3 className="text-red-400">AVISO</h3>

            <div>
              <div className="avisos" id="avisos">
                <button
                  className="btn btn-left-carrousel"
                  onClick={GoToTheLeft}
                  id="btn-left"
                  // style={{ display: 'none' }}
                >
                  <i className="fa fa-angle-double-left" aria-hidden="true"></i>
                </button>

                {workWithoutChangeState.map((wk) => (
                  <WorkState key={wk?._id} work={wk} />
                ))}
                <button onClick={GoToTheRight} className="btn btn-right-carrousel" id="btn-right">
                  <i className="fa fa-angle-double-right" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
        )
      ) : (
        <SmallLoading />
      )}
      {/* trabajos terminados  */}
      {
        // !loadingWorkState ?
        confirmWorks.length > 0 && (
          <div id="worksconfirm" className="home__section-recent-works shadow my-1 p-2">
            <h3 className="text-red-400">Trabajos Terminados</h3>

            <div>
              <div className="confirmados" id="confirmados">
                <button
                  className="btn btn-left-carrousel"
                  onClick={GoToTheLeft}
                  id="btn-left"
                  // style={{ display: 'none' }}
                >
                  <i className="fa fa-angle-double-left" aria-hidden="true"></i>
                </button>

                {confirmWorks.map((wk) => (
                  <WorkWithOut key={wk?._id} work={wk} />
                ))}
                <button onClick={GoToTheRight} className="btn btn-right-carrousel" id="btn-right">
                  <i className="fa fa-angle-double-right" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
        )
        // :
        //  (
        // 	<SmallLoading />
        // )
      }
    </div>
  ) : (
    <div className="works ">
      <span className="title-header"> Mis Trabajos </span>
      <div className="works-grid p-1 my-2">
        {clientWorks.length >= 0
          ? clientWorks.map((work) => <Work key={work._id} work={work} />)
          : null}
      </div>
    </div>
  );
};
