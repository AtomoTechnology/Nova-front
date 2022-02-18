import React, { useRef, useState } from 'react';
import { fetchWithOutToken, fetchWithToken } from '../helpers/fetchWithOutToken';

export const Banner = () => {
  const [photos, setPhotos] = useState([]);
  const bannerImages = useRef();

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
        // setPhotos((v) => [...v, url]);
      };
      reader.readAsDataURL(e.target.files[index]);
    }
    setPhotos(imgs);
  };

  const UploadBanners = async (e) => {
    e.preventDefault();
    const res = await fetchWithOutToken('banners', { photos }, 'POST');
    const body = await res.json();
    if (body.status === 'success') {
      console.log('photo uploaded');
      console.log(body);
      // window.location = '/index';
    }
  };
  return (
    <div>
      <form onSubmit={UploadBanners}>
        <fieldset>
          <label>Photo</label>
          <input type="file" multiple accept="" name="photo" onChange={ConvertPhoto} placeholder="carga photo" />
        </fieldset>
        <fieldset>
          <button type="submit" className="btn jhm-shadow bg-blue-500">
            Subir
          </button>
        </fieldset>
      </form>

      <div className="flex  items-center gap-4 p-4 m-4 overflow-auto" ref={bannerImages}></div>
    </div>
  );
};
