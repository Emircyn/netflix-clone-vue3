<script setup>
//import
import { Swiper, SwiperSlide } from 'swiper/vue';
import { UseMainStore } from '../stores/mainStore';
import { Navigation } from 'swiper';
import { onMounted, reactive, inject, watch } from 'vue';
import 'swiper/css';
import 'swiper/css/navigation';

const mainStore = UseMainStore();
const appAxios = inject('appAxios');
const router = inject('router');

const state = reactive({
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

watch(router.currentRoute, async () => {
  if (
    router.currentRoute._value.name === 'movie' ||
    router.currentRoute._value.name === 'tv'
  ) {
    await appAxios
      .get(
        `/${router.currentRoute._value.name}/${
          router.currentRoute._value.params.id
        }/recommendations?api_key=${
          import.meta.env.VITE_APP_API_KEY
        }&language=${mainStore.lang}&page=1`
      )
      .then((response) => {
        state.fetchData = response.data.results.filter(
          (data) =>
            data.poster_path !== null &&
            data.backdrop_path !== null &&
            data.overview.length > 0
        );
      });
  }
});

onMounted(async () => {
  if (
    router.currentRoute._value.name === 'movie' ||
    router.currentRoute._value.name === 'tv'
  ) {
    await appAxios
      .get(
        `/${router.currentRoute._value.name}/${
          router.currentRoute._value.params.id
        }/recommendations?api_key=${
          import.meta.env.VITE_APP_API_KEY
        }&language=${mainStore.lang}&page=1`
      )
      .then((response) => {
        state.fetchData = response.data.results.filter(
          (data) =>
            data.poster_path !== null &&
            data.backdrop_path !== null &&
            data.overview.length > 0
        );
      });
  } else {
    await appAxios
      .get(
        `/trending/${
          router.currentRoute._value.name == 'home' ||
          router.currentRoute._value.name == 'search'
            ? 'all'
            : router.currentRoute._value.path
        }/week?api_key=${import.meta.env.VITE_APP_API_KEY}&language=${
          mainStore.lang
        }&page=${props.page}`
      )
      .then((response) => {
        state.fetchData = response.data.results.filter(
          (data) =>
            data.poster_path !== null &&
            data.backdrop_path !== null &&
            data.overview.length > 0
        );
      });
  }
});
const props = defineProps({
  page: {
    page: String,
  },
  title: {
    title: String,
  },
});
</script>

<template>
  <div class="swiper-grid" v-if="state.fetchData.length || [] > 0">
    <div class="swiper-column">
      <a v-if="props.page <= 1 || props.page == null" class="swiper-header"
        >{{ props.title }}
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
          v-for="(item, index) in state.fetchData || []"
          :key="index"
          v-lazy:background-image="`${mainStore.imagesUrl}${item.poster_path}`"
          lazy="loading"
          class="skeleton"
        >
          <div class="swiper-content">
            <h5 class="content-title" style="text-transform: capitalize">
              {{
                mainStore.lang == 'tr-TR'
                  ? `${item.media_type == 'movie' ? 'Film' : 'Dizi'}`
                  : `${item.media_type == 'movie' ? 'Movie' : 'Tv-Series'}`
              }}
            </h5>
            <p class="content">{{ item.title || item.name }}</p>
          </div>

          <div class="swiper-button">
            <RouterLink
              class="button-rounded"
              :to="{ name: `${item.media_type}`, params: { id: item.id } }"
            >
              <i
                @click="router.push(`${item.media_type}${item.id}`)"
                class="bx bx-info-circle"
              ></i>
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
