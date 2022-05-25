<script setup>
//import
import { Swiper, SwiperSlide } from 'swiper/vue';
import axios from 'axios';
import { UseMainStore } from '../stores/mainStore';
import { Navigation } from 'swiper';
import { reactive } from 'vue';
import 'swiper/css';
import 'swiper/css/navigation';
//others
const mainStore = UseMainStore();
const props = defineProps({
  netflix_title: String,
});
const state = reactive({
  modules: [Navigation],
  swiperOptions: {
    breakpoints: {
      0: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      420: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      560: {
        slidesPerView: 3,
        spaceBetween: 10,
      },

      1024: {
        slidesPerView: 5,
        spaceBetween: 10,
      },
      1366: {
        slidesPerView: 7,
        spaceBetween: 10,
      },
    },
  },
});
</script>

<template>
  <div class="swiper-grid">
    <div class="swiper-column">
      <a class="swiper-header" href="#">{{ netflix_title }}</a>

      <swiper
        :modules="state.modules"
        :slidesPerView="6"
        :spaceBetween="10"
        :breakpoints="state.swiperOptions.breakpoints"
        :navigation="true"
        class="mySwiper"
      >
        <swiper-slide
          v-for="(item, index) in mainStore.movies.results"
          :key="index"
          :style="`background-image:url(${
            mainStore.imagesUrl + item.backdrop_path
          })`"
        >
          <div class="swiper-content">
            <h5 class="content-title" style="text-transform: capitalize">
              Movie
            </h5>
            <p class="content">{{ item.title }}</p>
          </div>
          <div class="swiper-button">
            <RouterLink class="button-rounded" to="about"
              ><i class="bx bx-info-circle"></i
            ></RouterLink>
          </div>
          <div class="swiper-content-bottom">
            <div class="left-side">
              <p><i class="bx bxs-like"></i>&nbsp;{{ item.vote_count }}</p>
            </div>
            <div class="right-side">
              <i class="bx bxl-imdb"></i>&nbsp;{{ item.vote_average }}
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
