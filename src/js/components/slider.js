// Подключение свайпера
import Swiper from "swiper";
import { Navigation, Pagination, Thumbs, Autoplay } from "swiper/modules";
Swiper.use([Navigation, Pagination, Thumbs, Autoplay]);

const productsSwiper = new Swiper(".products-slider__slider", {
  slidesPerView: 1.1,
  spaceBetween: 16,
  navigation: {
    nextEl: ".products-slider__slider-controls-next",
    prevEl: ".products-slider__slider-controls-prev",
  },
  // pagination: {
  //   el: ".clients__pagination",
  //   type: "progressbar",
  // },
  breakpoints: {
    // when window width is >= 990px
    1600: {
      slidesPerView: 4,
      spaceBetween: 20,
    },

    1100: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  },
});
