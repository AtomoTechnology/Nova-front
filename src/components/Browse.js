import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import { getWorksClient } from '../action/clientsAction';
import { fetchWithOutToken } from '../helpers/fetchWithOutToken';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Work } from './works/Work';

const Browse = () => {
  const dispatch = useDispatch();

  const [banners, setBanners] = useState([]);

  const { uid } = useSelector((state) => state.auth);
  const { clientWorks } = useSelector((state) => state.clients);

  useEffect(() => {
    dispatch(getWorksClient(uid));
  }, [dispatch, uid]);
  useEffect(() => {
    async function getAll() {
      const res = await fetchWithOutToken('banners');
      const body = await res.json();
      setBanners(body.data.banners);
    }
    getAll();
  }, []);

  return (
    <div className="m-4">
      <Swiper
        pagination={{
          type: 'fraction',
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper sm:h-72 bg-white shadow my-2"
      >
        {banners.map((b, i) => (
          <SwiperSlide key={i}>
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

export default Browse;
