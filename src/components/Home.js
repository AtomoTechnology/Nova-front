import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getWorksClient, startGettingAllClient } from '../action/clientsAction';
import { getAllWorks } from '../action/worksAction';
import moment from 'moment';
import { WorkState } from './works/WorkState';
import { SmallLoading } from './SmallLoading';
import { WorkWithOut } from './works/WorkWithOut';
import { Work } from './works/Work';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper';
import { fetchWithOutToken } from '../helpers/fetchWithOutToken';
const Home = () => {
  const dispatch = useDispatch();
  const [workStates, setWorkStates] = useState([]);
  const [loadingWorkState, setLoadingWorkState] = useState(true);
  const { role, uid } = useSelector((state) => state.auth);
  const [banners, setBanners] = useState([]);
  useEffect(async () => {
    const res = await fetchWithOutToken('banners');
    const body = await res.json();
    setBanners(body.data.banners);
  }, []);
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
    let fecha = moment(moment(works[i].states[works[i].states.length - 1]?.fecha).format('YYYY-MM-DD'));
    if (
      ahora.diff(fecha, 'days') >= 3 &&
      (works[i].states[works[i].states.length - 1].nombre === 'Revision' ||
        works[i].states[works[i].states.length - 1].nombre === 'Presupuesto')
    ) {
      workWithoutChangeState.push(works[i]);
    }
  }

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
              <span>{works.length}</span>
              <h3>Trabajos</h3>
            </div>
            <i className="fas fa-th-list text-yellow-700"></i>
          </div>
        </Link>
        <a href="#worksaviso" className="works-avisos">
          <div className="works-content">
            <div className="content-left">
              <span>{loadingWorkState ? <SmallLoading text="" size="small" /> : workWithoutChangeState.length}</span>
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

            <Swiper
              // slidesPerView={4}
              // spaceBetween={30}
              // slidesPerGroup={3}
              // loop={true}
              // loopFillGroupWithBlank={true}
              breakpoints={{
                // when window width is >= 640px
                500: {
                  width: 500,
                  slidesPerView: 1,
                },

                // when window width is >= 768px
                768: {
                  width: 768,
                  slidesPerView: 2,
                },
                1200: {
                  width: 1200,
                  slidesPerView: 3,
                },
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              {workWithoutChangeState.map((wk) => (
                <SwiperSlide key={wk._id}>
                  <WorkState work={wk} />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* <div>
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
            </div> */}
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

            <Swiper
              // slidesPerView={4}
              // spaceBetween={30}
              // slidesPerGroup={3}
              // loop={true}
              // loopFillGroupWithBlank={true}
              breakpoints={{
                // when window width is >= 640px
                500: {
                  width: 500,
                  slidesPerView: 1,
                },

                // when window width is >= 768px
                768: {
                  width: 768,
                  slidesPerView: 2,
                },
                1200: {
                  width: 1200,
                  slidesPerView: 3,
                },
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              {confirmWorks.map((wk) => (
                <SwiperSlide key={wk?._id}>
                  <WorkWithOut work={wk} />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* <div>
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
            </div> */}
          </div>
        )
        // :
        //  (
        // 	<SmallLoading />
        // )
      }
    </div>
  ) : (
    <div className="m-4">
      <Swiper
        pagination={{
          type: 'fraction',
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper sm:h-72 bg-white shadow my-2"
      >
        {banners.map((b) => (
          <SwiperSlide>
            <img src={b.photo} alt={b.id} />
          </SwiperSlide>
        ))}
      </Swiper>
      {}
      <div className="clients-works my-2">
        <span className="title-form !mb-0"> Mis Trabajos </span>
        <div className="works-grid p-1">
          {clientWorks.length > 0 ? (
            clientWorks.map((work) => <Work key={work._id} work={work} />)
          ) : (
            <span>Todavia no hiciste ningun trabajo</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
