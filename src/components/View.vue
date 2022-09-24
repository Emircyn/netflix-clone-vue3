<script setup>
import { onMounted, inject, reactive } from 'vue';
import { UseMainStore } from '../stores/mainStore';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

const appAxios = inject('appAxios');
const router = inject('router');
const mainStore = UseMainStore();

const state = reactive({
  details: [],
  credits: [],
  video: [],
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
      `/${router.currentRoute._value.name}/${
        router.currentRoute._value.params.id
      }?api_key=${import.meta.env.VITE_APP_API_KEY}&language=${mainStore.lang}`
    )
    .then((response) => {
      state.details = response.data;
    });
  await appAxios
    .get(
      `/${router.currentRoute._value.name}/${
        router.currentRoute._value.params.id
      }/credits?api_key=${import.meta.env.VITE_APP_API_KEY}&language=${
        mainStore.lang
      }`
    )
    .then((creditsResponse) => {
      state.credits = creditsResponse.data.cast.filter(
        (cast) => cast.profile_path !== null
      );
    });
  await appAxios
    .get(
      `/${router.currentRoute._value.name}/${
        router.currentRoute._value.params.id
      }/videos?api_key=${import.meta.env.VITE_APP_API_KEY}&language=${
        mainStore.lang
      }&append_to_response=videos`
    )
    .then((videoResponse) => {
      state.video = videoResponse.data.results.find(
        (vid) => vid.type === 'Trailer' && vid.official === true
      );
    });
});
</script>

<template>
  <div
    class="content-grid skeleton"
    v-lazy:background-image="
      `${mainStore.imagesUrl}${state.details.backdrop_path}`
    "
    lazy="loading"
  >
    <div class="content">
      <div class="img">
        <img
          v-lazy="`${mainStore.imagesUrl}${state.details.poster_path}`"
          draggable="false"
          lazy="loading"
          class="skeleton"
        />

        <button class="button button-more margin-i-auto">
          <span
            ><a
              :href="
                (state.details.homepage || []).length > 0
                  ? state.details.homepage
                  : null
              "
              :class="
                (state.details.homepage || []).length > 0 ? null : 'isDisabled'
              "
              >{{ mainStore.lang === 'tr-TR' ? 'Anasayfa' : 'Homepage' }}</a
            ></span
          >
        </button>
      </div>
      <div class="content-txt">
        <h1>
          {{ state.details.name ? state.details.name : state.details.title }}
        </h1>
        <p>{{ state.details.overview }}</p>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="view-element" v-if="(state.credits || []).length > 0">
      <h2>{{ mainStore.lang == 'tr-TR' ? 'Aktörler' : 'The lead actors' }}</h2>
      <swiper
        :modules="state.modules"
        :slidesPerView="6"
        :spaceBetween="10"
        :breakpoints="state.swiperOptions.breakpoints"
        :navigation="true"
        class="mySwiper"
      >
        <swiper-slide
          v-for="cast in state.credits || []"
          :key="cast"
          v-lazy:background-image.container="{
            src: `${mainStore.imagesUrl}${cast.profile_path}`,
          }"
          lazy="loading"
          class="skeleton"
        >
          <div class="actors-content">
            <h2>{{ cast.name }}</h2>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <div class="view-element" v-if="state.video">
      <h2>{{ state.video.name }}</h2>
      <iframe
        width="100%"
        height="auto"
        :src="`https://www.youtube.com/embed/${state.video.key}`"
        :title="state.details.name || state.details.title"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>

    <div class="view-element">
      <h2 v-if="router.currentRoute._value.name == 'tv'">Current Season</h2>
      <div class="about">
        <div
          class="img skeleton"
          v-lazy:background-image="
            `${mainStore.imagesUrl}${state.details.poster_path}`
          "
          lazy="loading"
        ></div>
        <div class="content">
          <h2 class="header">
            {{ state.details.title || state.details.name }}
          </h2>
          <p class="about-small-header">
            {{
              (state.details.genres || []).length > 0
                ? state.details.genres.map((x) => x.name)
                : null
            }}
          </p>
          <p class="about-small-header">
            {{ state.details.release_date || state.details.number_of_seasons
            }}<span v-if="router.currentRoute._value.name == 'tv'">{{
              mainStore.lang == 'tr' ? ' Sezon' : ' Season'
            }}</span>
          </p>
          <p class="about-txt">{{ state.details.tagline }}</p>
          <p class="about-txt">
            {{ state.details.first_air_date }}
            {{ state.details.title || state.details.name }}
            <span v-if="mainStore.lang === 'en-GB'">{{
              state.details.status
            }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.isDisabled {
  color: fff;
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
