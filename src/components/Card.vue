<script setup>
import { UseMainStore } from '../stores/mainStore';
import { onMounted, reactive, inject, watchEffect, watch } from 'vue';
import SwiperCard from './Swiper.vue';

const appAxios = inject('appAxios');

const router = inject('router');
const mainStore = UseMainStore();

const state = reactive({
  fetchData: [],
});

watchEffect((searchData) => {
  if (mainStore.query.length || [] > 0) {
    const fetchData = setTimeout(() => {
      appAxios
        .get(
          `search/multi?api_key=${import.meta.env.VITE_APP_API_KEY}&query=${
            mainStore.query
          }&language=${mainStore.lang}&page=1`
        )
        .then((response) => {
          state.fetchData = response.data.results.filter(
            (data) =>
              data.poster_path !== null &&
              data.backdrop_path !== null &&
              data.media_type != 'person' &&
              data.overview.length > 0
          );
        });
    }, 700);
    searchData(() => clearTimeout(fetchData));
  } else {
    appAxios
      .get(
        `/trending/all/day?api_key=${
          import.meta.env.VITE_APP_API_KEY
        }&language=${mainStore.lang}&page=${~~(Math.random() * 10) + 1}`
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
  console.log(router.currentRoute._value.query.q);
  if (
    router.currentRoute._value.query.q ||
    router.currentRoute._value.query.q != undefined
  ) {
    mainStore.query = router.currentRoute._value.query.q;
    await appAxios
      .get(
        `search/multi?api_key=${import.meta.env.VITE_APP_API_KEY}&query=${
          router.currentRoute._value.query.q
        }&language=${mainStore.lang}&page=1`
      )
      .then((response) => {
        state.fetchData = response.data.results.filter(
          (data) =>
            data.poster_path !== null &&
            data.backdrop_path !== null &&
            data.media_type != 'person' &&
            data.overview.length > 0
        );
      });
  } else {
    await appAxios
      .get(
        `/trending/all/day?api_key=${
          import.meta.env.VITE_APP_API_KEY
        }&language=${mainStore.lang}&page=${~~(Math.random() * 10) + 1}`
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
</script>
<template>
  <div class="container">
    <div class="swiper-search" v-if="state.fetchData.length <= 0">
      <SwiperCard
        page="1"
        :title="
          state.fetchData.length || [] <= 0
            ? mainStore.lang == 'tr-TR'
              ? `\”${mainStore.query}\” için herhangi bir eşleşme bulamadık. En popüler TV şovlarımıza ve filmlerimize göz atın.
`
              : `We didn't find any matches for \”${mainStore.query}\” Browse our most popular TV shows and movies.`
            : null
        "
      />
    </div>
    <div class="grid-container">
      <Transition>
        <div class="search-query" v-if="mainStore.query.length || [] > 0">
          <a>{{
            state.fetchData.length || [] > 0
              ? mainStore.lang == 'tr-TR'
                ? `\”${mainStore.query}\” için sonuçlar.`
                : `Results for \”${mainStore.query}\”.`
              : null
          }}</a>
        </div>
      </Transition>
      <div
        class="movie-card"
        v-for="(item, index) in state.fetchData || []"
        :key="index"
        @click="router.push(`/${item.media_type}/${item.id}`)"
      >
        <div
          class="movie-header movies skeleton"
          v-lazy:background-image="`${mainStore.bgUrl}${item.poster_path}`"
          lazy="loading"
        ></div>
        <!--movie-header-->
        <div class="movie-content">
          <div class="movie-content-header">
            <a>
              <h3 class="movie-title">{{ item.name || item.title }}</h3>
            </a>
            <div
              class="netflix-logo skeleton"
              v-lazy:background-image="
                `${'https://www.freepnglogos.com/uploads/netflix-logo-0.png'}`
              "
            ></div>
          </div>
          <div class="movie-info">
            <div class="info-section">
              <label>Type</label>
              <span>
                {{
                  mainStore.lang == 'tr-TR'
                    ? item.media_type == 'movie'
                      ? 'Film'
                      : 'Tv-Serisi'
                    : item.media_type
                }}</span
              >
            </div>
            <div class="info-section">
              <label>{{
                mainStore.lang == 'tr-TR' ? 'Çıkış Tarihi' : 'Release Date'
              }}</label>
              <span>{{ item.release_date || item.first_air_date }}</span>
            </div>
            <!--date,time-->

            <!--screen-->
            <div class="info-section">
              <label>{{ mainStore.lang == 'tr-TR' ? 'Oylar' : 'Vote' }}</label>
              <span
                ><i class="bx bxs-like"></i>
                {{ Math.floor(item.vote_average) }}</span
              >
            </div>
            <!--row-->
            <div class="info-section">
              <label>{{
                mainStore.lang == 'tr-TR' ? 'Popülerlik' : 'Popularity'
              }}</label>
              <span>%{{ Math.floor(item.popularity / 100).toFixed(1) }}</span>
            </div>
            <!--seat-->
          </div>
        </div>
        <!--movie-content-->
      </div>
      <!--movie-card-->
    </div>
    <!--container-->
  </div>
</template>
<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
