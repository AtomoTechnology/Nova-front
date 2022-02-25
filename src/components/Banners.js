import React, { useEffect, useRef, useState } from 'react';
import { fetchWithOutToken, fetchWithToken } from '../helpers/fetchWithOutToken';
import { showAlert } from './alerts';
import { SmallLoading } from './SmallLoading';

const Banners = () => {
  const [photos, setPhotos] = useState([]);
  const [banners, setBanners] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOk, setIsOk] = useState(true);
  const [addingBanner, setAddingBanner] = useState(false);
  const bannerImages = useRef();
  const uploadForm = useRef();
  const inputBanner = useRef();

  useEffect(async () => {
    setLoading(true);
    const res = await fetchWithOutToken('banners');
    const body = await res.json();
    setBanners(body.data.banners);
    console.log(body.data.banners);
    setLoading(false);
  }, [refresh]);

  const ConvertPhoto = (e) => {
    bannerImages.current.innerHTML = '';
    let imgs = [];
    for (let index = 0; index < e.target.files.length; index++) {
      var reader = new FileReader();
      reader.onload = function (e) {
        let url = e.target.result;
        let div = document.createElement('img');
        div.classList.add(`image-banner-${index}`);
        div.width = '150px';
        bannerImages.current.appendChild(div);
        div.setAttribute('src', url);
        div.setAttribute('width', 150);
        div.setAttribute('key', index);
        imgs.push({ photo: url });
      };
      reader.readAsDataURL(e.target.files[index]);
    }
    setPhotos(imgs);
  };

  const UploadBanners = async (e) => {
    e.preventDefault();
    if (photos.length <= 0) {
      setIsOk(false);
    } else {
      setIsOk(true);
      setAddingBanner(true);
      const res = await fetchWithToken('banners', { photos }, 'POST');
      const body = await res.json();
      if (body.status === 'success') {
        console.log('photo uploaded');
        setRefresh(!refresh);
        bannerImages.current.innerHTML = '';
        setPhotos([]);
        console.log(inputBanner.current);
        console.log(inputBanner.files);
        console.log(inputBanner.values);
        inputBanner.current.files = null;
      }
    }
    setAddingBanner(false);
  };

  const deleteBanner = async (id) => {
    const res = await fetchWithToken(`banners/${id}`, {}, 'DELETE');
    const body = await res.json();
    if (body.status === 'success') {
      showAlert('success', 'Banner borrado con exito. ✔');
      setRefresh(!refresh);
    } else {
      showAlert('error', body.message);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={() => {
          uploadForm.current.classList.toggle('hidden');
        }}
        className="btn bg-red-500 my-2"
      >
        Cargar Banner
      </button>
      <div ref={uploadForm} className="p-2 shadow bg-white my-4">
        <form onSubmit={UploadBanners}>
          <fieldset>
            <label>Imagen(es)</label>
            <input
              ref={inputBanner}
              type="file"
              multiple
              accept="image/*"
              name="photo"
              onChange={ConvertPhoto}
              placeholder="carga photo"
            />
            {!isOk && (
              <span className="bg-red-100 text-red-800 p-2 my-2 text-center"> Tienes que cargar 1 o mas imagenes </span>
            )}
          </fieldset>
          <fieldset>
            <button type="submit" className="btn jhm-shadow bg-blue-500">
              {addingBanner ? <SmallLoading text="" size="small" /> : ' Agregar Banner'}
            </button>
          </fieldset>
        </form>
        <div className="flex  items-center gap-4 p-4 m-4 overflow-auto" ref={bannerImages}></div>
      </div>

      <div
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        }}
        className="grid justify-between items-center gap-2 "
      >
        {banners.map((b, i) => (
          <div
            className="banner cursor-pointer hover:shadow-2xl overflow-hidden object-cover shadow-md rounded h-auto relative"
            key={b.id}
          >
            <img src={b.photo} alt={i} />
            <span
              onClick={() => deleteBanner(b.id)}
              className="delete-banner w-8 h-8  hidden  absolute top-2 right-2 rounded-full cursor-pointer hover:shadow-md hover:text-red-500  text-red-700  shadow p-1  justify-center items-center text-center bg-white"
            >
              <i className="fas fa-trash flex justify-center items-center text-center"></i>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banners;
