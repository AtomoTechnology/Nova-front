import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllWorks } from '../action/worksAction';
import moment from 'moment';
import { WorkState } from './works/WorkState';
import { SmallLoading } from './SmallLoading';
import { WorkWithOut } from './works/WorkWithOut';
import { fetchWithToken } from '../helpers/fetchWithOutToken';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation } from 'swiper';
// import { GetTotalQueriesNotRead } from '../action/queriesAction';

const Home = ({ history }) => {
  const { role } = useSelector((state) => state.auth);
  if (role === 'user') {
    history.push('browse');
  }

  const dispatch = useDispatch();
  const [loadingWorkState, setLoadingWorkState] = useState(true);
  const [totalClient, setTotalClient] = useState(0);

  useEffect(() => {
    async function GetData() {
      await dispatch(getAllWorks());
      const resp = await fetchWithToken(`users/stats`);
      const users = await resp.json();
      if (users.status === 'success') {
        setTotalClient(users.total);
      }
      setLoadingWorkState(false);
    }
    GetData();

    return () => {
      setTotalClient(0);
    };
  }, [dispatch]);

  const { works, total } = useSelector((state) => state.works);

  var confirmWorks = [];
  works.forEach((cw) => {
    if (cw.estado.name === 'Terminado') {
      confirmWorks.push(cw);
    }
  });

  let ahora = moment(moment().format('YYYY-MM-DD'));

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

  return (
    <div className="home">
      <div className="home__statistics shadow  mb-2 p-1">
        {/* <h3>Estadisticas</h3> */}
        <Link to="clients" className="users">
          <div className="users-content">
            <div className="content-left">
              <span>{totalClient}</span>
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
        <div className="works-avisos">
          <div className="works-content">
            <div className="content-left">
              <span>{loadingWorkState ? <SmallLoading text="" size="small" /> : workWithoutChangeState.length}</span>
              <h3>Avisos</h3>
            </div>
            <i className="fas fa-flag text-red-700"></i>
          </div>
        </div>
        <div className="works-confirm">
          <div className="works-content">
            <div className="content-left">
              <span>{confirmWorks.length}</span>
              <h3>Terminados</h3>
            </div>
            <i className="fas fa-calendar-check text-pink-400"></i>
          </div>
        </div>
      </div>
      {!loadingWorkState ? (
        workWithoutChangeState.length > 0 && (
          <div id="worksaviso" className="home__section-recent-works shadow my-1 p-2">
            <h3 className="text-red-400">AVISO</h3>

            <Swiper
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
              modules={[Navigation]}
              className="mySwiper"
            >
              {workWithoutChangeState.map((wk) => (
                <SwiperSlide key={wk._id}>
                  <WorkState work={wk} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )
      ) : (
        <SmallLoading />
      )}
      {confirmWorks.length > 0 && (
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
            modules={[Navigation]}
            className="mySwiper"
          >
            {confirmWorks.map((wk) => (
              <SwiperSlide key={wk?._id}>
                <WorkWithOut work={wk} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default Home;
