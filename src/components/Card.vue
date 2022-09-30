<script setup>
import { UseMainStore } from '../stores/mainStore';
import { onMounted, reactive, inject, watch, watchEffect } from 'vue';
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
  if (router.currentRoute._value.query.q) {
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
    <div class="grid-container">
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
<style scoped></style>
