<script setup>
import { watchEffect, ref } from 'vue';
import { UseMainStore } from '../stores/mainStore';
const mainStore = UseMainStore();
const playVideo = ref(null);
const showDesc = ref(true);
const loading = ref(false);
const muted = ref(true);
const props = defineProps({
  type: String,
});
const homepage = () => {
  setTimeout(() => {
    mainStore.tv.homepage ? window.open(mainStore.tv.homepage) : '';
    loading.value = false;
  }, 1500);
};
setTimeout(() => {
  playVideo.value = true;
}, Math.floor(Math.random() * 3000) + 5000);
watchEffect(
  () =>
    props.type == 'movie'
      ? mainStore.movies != 0
        ? mainStore.fetchMovie()
        : mainStore.fetchMovie()
      : mainStore.tvs != 0
      ? mainStore.fetchTv()
      : mainStore.fetchTv()
  //,
  //,
);
watchEffect(() => {
  if (playVideo.value) {
    setTimeout(() => {
      playVideo.value = false;
      console.log('timeout');
    }, 15000);
    setTimeout(() => {
      showDesc.value = false;
      console.log('interval');
    }, 7000);
  }
  if (playVideo.value == null || playVideo.value == false) {
    setTimeout(() => {
      showDesc.value = true;
    }, 500);
  }
});
</script>
<template>
  <div
    v-if="type == 'movie'"
    class="billboard"
    :style="`background-image: url('${
      mainStore.movie.backdrop_path != null
        ? mainStore.imagesUrl + mainStore.movie.backdrop_path
        : '/img/not-found.jpg'
    }');`"
  >
    <iframe
      v-if="playVideo && mainStore.TrailerUrl != null"
      class="billboard"
      style="z-index: 0"
      :src="muted ? mainStore.TrailerUrl + '1' : mainStore.TrailerUrl"
      title="Offical Trailer"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
    <div class="billboard-content">
      <h1
        v-if="showDesc"
        ref="tooltip"
        :class="showDesc ? 'tooltip-show' : 'tooltip'"
      >
        {{ mainStore.movie.title }}
      </h1>

      <p
        v-if="mainStore.movie.overview"
        ref="tooltip"
        :class="showDesc ? 'tooltip-show' : 'tooltip'"
      >
        {{ mainStore.movie.overview.slice(0, 200) + '...' }}
      </p>
      <p v-else ref="tooltip" :class="showDesc ? 'tooltip-show' : 'tooltip'">
        NOT DATA FOUND
      </p>

      <h1
        v-show="!showDesc"
        ref="tooltip"
        :class="showDesc ? 'tooltip' : 'tooltip-show'"
      >
        {{ mainStore.movie.title }}
      </h1>

      <div class="billboard-buttons">
        <button
          class="button button-white margin-r-05"
          @click="play, (loading = !loading)"
        >
          <div v-if="loading">
            Sunucuya erişiliyor.
            <div class="line-wobble"></div>
          </div>
          <span v-else> <i class="bx bxs-right-arrow"></i>&nbsp;Oynat</span>
        </button>
        <RouterLink :to="`/movies/${mainStore.movie.id}`">
          <button class="button button-gray margin-r-05">
            <i class="bx bx-info-circle"></i>&nbsp;Daha fazlası
          </button></RouterLink
        >
        <button
          v-if="mainStore.TrailerUrl && playVideo"
          class="button button-gray margin-r-05"
          @click="muted = !muted"
        >
          <i :class="muted ? 'bx bx-volume-mute' : 'bx bx-volume-full'"></i>
        </button>
        <button
          @click="playVideo = true"
          v-if="!playVideo && playVideo != null"
          class="button button-gray"
        >
          <i class="bx bx-refresh"></i>
        </button>
      </div>
    </div>
    <div class="billboard-overlay"></div>
  </div>
  <!-------TVS-------->
  <div
    v-if="type == 'tv'"
    class="billboard"
    :style="`background-image: url('${
      mainStore.tv.backdrop_path != null
        ? mainStore.imagesUrl + mainStore.tv.backdrop_path
        : '/img/not-found.jpg'
    }');`"
  >
    <iframe
      v-if="playVideo && mainStore.TrailerTvUrl != null"
      class="billboard"
      style="z-index: 0"
      :src="muted ? mainStore.TrailerTvUrl + '1' : mainStore.TrailerTvUrl"
      title="Offical Trailer"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
    <div class="billboard-content">
      <h1
        v-if="showDesc"
        ref="tooltip"
        :class="showDesc ? 'tooltip-show' : 'tooltip'"
      >
        {{ mainStore.tv.name }}
      </h1>
      <h2 v-if="mainStore.tv.tagline && showDesc">
        {{ mainStore.tv.tagline }}
      </h2>
      <p
        v-if="mainStore.tv.overview"
        ref="tooltip"
        :class="showDesc ? 'tooltip-show' : 'tooltip'"
      >
        {{ mainStore.tv.overview.slice(0, 200) }}
      </p>
      <p v-else ref="tooltip" :class="showDesc ? 'tooltip-show' : 'tooltip'">
        NO DATA FOUND
      </p>

      <h1
        v-show="!showDesc"
        ref="tooltip"
        :class="showDesc ? 'tooltip' : 'tooltip-show'"
      >
        {{ mainStore.tv.name }}
      </h1>

      <div class="billboard-buttons">
        <button
          class="button button-white margin-r-05"
          @click="play, (loading = !loading), homepage()"
        >
          <div v-if="loading">
            Sunucuya erişiliyor.
            <div class="line-wobble"></div>
          </div>
          <span v-else> <i class="bx bxs-right-arrow"></i>&nbsp;Oynat</span>
        </button>
        <RouterLink :to="`/tv/${mainStore.tv.id}`">
          <button class="button button-gray margin-r-05">
            <i class="bx bx-info-circle"></i>&nbsp;Daha fazlası
          </button></RouterLink
        >
        <button
          v-if="mainStore.TrailerTvUrl && playVideo"
          class="button button-gray margin-r-05"
          @click="muted = !muted"
        >
          <i :class="muted ? 'bx bx-volume-mute' : 'bx bx-volume-full'"></i>
        </button>
        <button
          @click="playVideo = true"
          v-if="!playVideo && playVideo != null"
          class="button button-gray"
        >
          <i class="bx bx-refresh"></i>
        </button>
      </div>
    </div>
    <div class="billboard-overlay"></div>
  </div>
</template>
<style scoped>
.tooltip {
  opacity: 0;
  transform: translateY(-30px) scale(0.96);
  transition: transform 0.35s, opacity 0.25s;
}

.tooltip-show {
  opacity: 1;
  transform: translateY(0) scale(1);
  transition: transform 0.35s, opacity 1s;
}
.line-wobble {
  --uib-size: 80px;
  --uib-speed: 1.75s;
  --uib-color: black;
  --uib-line-weight: 5px;

  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--uib-line-weight);
  width: 100%;
  border-radius: calc(var(--uib-line-weight) / 2);
  overflow: hidden;
  transform: translate3d(0, 0, 0);
}

.line-wobble::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: var(--uib-color);
  opacity: 0.1;
}

.line-wobble::after {
  content: '';
  height: 100%;
  width: 100%;
  border-radius: calc(var(--uib-line-weight) / 2);
  animation: wobble var(--uib-speed) ease-in-out infinite;
  transform: translateX(-95%);
  background-color: var(--uib-color);
}

@keyframes wobble {
  0%,
  100% {
    transform: translateX(-95%);
  }
  50% {
    transform: translateX(95%);
  }
}
</style>
