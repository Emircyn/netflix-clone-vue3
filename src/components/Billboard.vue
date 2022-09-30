<script setup>
import { UseMainStore } from '../stores/mainStore';
import { onMounted, inject, reactive } from 'vue';
const mainStore = UseMainStore();
const appAxios = inject('appAxios');

const state = reactive({
  fetchData: [],
  details: [],
  video: [],
  videoPlay: false,
  muted: true,
});

const changeBillboard = async () => {
  await appAxios
    .get(
      `/trending/${props.type}/day?api_key=${
        import.meta.env.VITE_APP_API_KEY
      }&language=${mainStore.lang}&page=1`
    )
    .then((response) => {
      const movie = response.data.results.filter(
        (data) => data.backdrop_path !== null && data.overview !== ''
      );

      state.fetchData = movie[Math.floor(Math.random() * 20)];
    });
  await appAxios
    .get(
      `/${props.type}/${state.fetchData.id}/videos?api_key=${
        import.meta.env.VITE_APP_API_KEY
      }&language=${mainStore.lang}&append_to_response=videos`
    )
    .then((videoResponse) => {
      state.video = videoResponse.data.results.find(
        (vid) => vid.type === 'Trailer' && vid.official === true
      );
    });
};
const random = Math.floor(Math.random() * 20);
onMounted(async () => {
  await appAxios
    .get(
      `/trending/${props.type}/day?api_key=${
        import.meta.env.VITE_APP_API_KEY
      }&language=${mainStore.lang}&page=1`
    )
    .then((response) => {
      const movie = response.data.results.filter(
        (data) =>
          data.poster_path !== null &&
          data.backdrop_path !== null &&
          data.overview.length > 0
      );

      state.fetchData = movie[random];
    });
  await appAxios
    .get(
      `/${props.type}/${state.fetchData.id}/videos?api_key=${
        import.meta.env.VITE_APP_API_KEY
      }&language=${mainStore.lang}&append_to_response=videos`
    )
    .then((videoResponse) => {
      state.video = videoResponse.data.results.find(
        (vid) => vid.type === 'Trailer' && vid.official === true
      );
    });
});
const props = defineProps({
  type: String,
});
</script>
<template>
  <div
    class="billboard skeleton"
    v-lazy:background-image.container="
      `${mainStore.bgUrl}${state.fetchData.backdrop_path}`
    "
    lazy="loading"
  >
    <iframe
      v-if="state.videoPlay"
      class="billboard"
      :src="`https://www.youtube.com/embed/${
        state.video.key
      }?rel=0&autoplay=1&muted=${state.muted ? 1 : 0}&controls=0&vq=hd1080p`"
      :title="`${state.video.name}`"
      frameborder="0"
      allow="autoplay"
      allowfullscreen
      style="z-index: 0"
    ></iframe>
    <div class="billboard-content">
      <h1>{{ state.fetchData.title || state.fetchData.name }}</h1>
      <h2>{{ state.fetchData.tagline }}</h2>
      <p>{{ state.fetchData.overview || '' }}</p>

      <div class="billboard-buttons">
        <button
          class="button button-white margin-r-05"
          @click="state.videoPlay = !state.videoPlay"
          v-if="state.video"
        >
          <span>
            <i
              :class="`bx ${
                state.videoPlay ? 'bx-stop-circle' : 'bxs-right-arrow'
              }`"
            ></i
            >&nbsp;{{
              !state.videoPlay
                ? mainStore.lang == 'tr-TR'
                  ? 'Oynat'
                  : 'Play'
                : mainStore.lang == 'tr-TR'
                ? 'Durdur'
                : 'Stop'
            }}</span
          >
        </button>
        <RouterLink :to="`/${props.type}/${state.fetchData.id}`">
          <button class="button button-gray margin-r-05">
            <i class="bx bx-info-circle"></i>&nbsp;Daha fazlası
          </button></RouterLink
        >
        <button
          class="button button-gray margin-r-05"
          @click="state.muted = !state.muted"
          v-if="state.videoPlay"
        >
          <i
            class="bx"
            :class="`${state.muted ? 'bx-volume-mute' : 'bx-volume-full'}`"
          ></i>
        </button>
        <button
          class="button button-gray"
          v-if="!state.videoPlay"
          @click="changeBillboard"
        >
          <i class="bx bx-refresh"></i>
        </button>
      </div>
    </div>
    <div class="billboard-overlay"></div>
  </div>
</template>
