// alert('hello');
// await loadScript('main.js');
// const b = document.querySelector('#banner-content-imgs');
// console.log('hereeee...', b);

import { Swiper } from 'swiper/react';
function HideAlert() {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
}

var swiper = new Swiper('.mySwiper', {
  slidesPerView: 3,
  spaceBetween: 10,
  // init: false,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    640: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 50,
    },
  },
});
