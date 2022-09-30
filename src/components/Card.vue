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
  if (mainStore.query.length > 0) {
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
    }, 1000);
    searchData(() => clearTimeout(fetchData));
  }
});

// const searchData = async (query) => {
//   const dataFetch = await setTimeout(() => {
//     appAxios
//       .get(
//         `search/keyword?api_key=${
//           import.meta.env.VITE_APP_API_KEY
//         }&query=${query}&language=${mainStore.lang}&page=1`
//       )
//       .then((response) => {
//         state.fetchData = response.data.results.filter(
//           (data) =>
//             data.poster_path !== null &&
//             data.backdrop_path !== null &&
//             data.overview.length > 0
//         );
//       });
//   }, 1000);
//   query(() => clearTimeout(dataFetch));
// };
onMounted(async () => {
  await appAxios
    .get(
      `/discover/${
        mainStore.type[~~(Math.random() * mainStore.type.length)]
      }?api_key=${import.meta.env.VITE_APP_API_KEY}&language=${
        mainStore.lang
      }&page=${~~(Math.random() * 10) + 1}`
    )
    .then((response) => {
      state.fetchData = response.data.results.filter(
        (data) =>
          data.poster_path !== null &&
          data.backdrop_path !== null &&
          data.overview.length > 0
      );
    });
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
            <a href="#">
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
              <label>Date &amp; Time</label>
              <span>Sun 8 Sept - 10:00PM</span>
            </div>
            <!--date,time-->
            <div class="info-section">
              <label>Screen</label>
              <span>03</span>
            </div>
            <!--screen-->
            <div class="info-section">
              <label>Row</label>
              <span>F</span>
            </div>
            <!--row-->
            <div class="info-section">
              <label>Seat</label>
              <span>21,22</span>
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
