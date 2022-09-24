<script setup>
//import
import { Swiper, SwiperSlide } from 'swiper/vue';
import { UseMainStore } from '../stores/mainStore';
import { Navigation } from 'swiper';
import { onMounted, reactive, inject } from 'vue';
import 'swiper/css';
import 'swiper/css/navigation';

const mainStore = UseMainStore();
const appAxios = inject('appAxios');

const state = reactive({
  imgObj: {
    src: null,
    error: 'http://xx.com/error.png',
    loading:
      'https://cdn.dribbble.com/users/1106178/screenshots/4175222/media/5244fb173280f7d2fe8707a48106abea.gif',
  },
  fetchData: [],
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
onMounted(async () => {
  await appAxios
    .get(
      `/${props.type}/popular?api_key=${
        import.meta.env.VITE_APP_API_KEY
      }&language=${mainStore.lang}&page=${props.page}`
    )
    .then((response) => {
      state.fetchData = response.data.results.filter(
        (data) => data.poster_path
      );
    });
});
const props = defineProps({
  page: Number,
  type: String,
});
</script>

<template>
  <div class="swiper-grid">
    <div class="swiper-column">
      <a class="swiper-header" href="#"
        >{{
          mainStore.lang == 'tr-TR'
            ? `Netflix'te Popüler ${
                props.type == 'movie' ? 'Filimler' : 'Diziler'
              }`
            : `Netflix Popular ${
                props.type == 'movie' ? 'Movies' : 'Tv-Series'
              }`
        }}
      </a>

      <swiper
        :modules="state.modules"
        :slidesPerView="6"
        :spaceBetween="10"
        :breakpoints="state.swiperOptions.breakpoints"
        :navigation="true"
        class="mySwiper"
      >
        <swiper-slide
          v-for="(item, index) in state.fetchData"
          :key="index"
          v-lazy:background-image="state.imgObj"
        >
          <span style="display: none">{{
            (state.imgObj.src = mainStore.imagesUrl + item.poster_path)
          }}</span>
          <div class="swiper-content">
            <h5 class="content-title" style="text-transform: capitalize">
              {{
                mainStore.lang == 'tr-TR'
                  ? `${props.type == 'movie' ? 'Filim' : 'Dizi'}`
                  : `${props.type == 'movie' ? 'Movie' : 'Tv-Series'}`
              }}
            </h5>
            <p class="content">{{ item.title || item.name }}</p>
          </div>

          <div class="swiper-button">
            <RouterLink
              class="button-rounded"
              :to="`/${props.type}/${item.id}`"
            >
              <i class="bx bx-info-circle"></i>
            </RouterLink>
          </div>

          <div class="swiper-content-bottom">
            <div class="left-side">
              <p><i class="bx bxs-like"></i>&nbsp; {{ item.vote_count }}</p>
            </div>
            <div class="right-side">
              <i class="bx bxl-imdb"></i>&nbsp; {{ item.vote_average }}
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
