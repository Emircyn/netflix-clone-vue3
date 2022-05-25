<script setup>
import { watchEffect, ref, onMounted } from 'vue';
import { UseMainStore } from '../stores/mainStore';
const mainStore = UseMainStore();
const playVideo = ref(false);
const muted = ref(true);
setTimeout(() => {
  playVideo.value = true;
}, Math.floor(Math.random() * 3000) + 5000);
watchEffect(() =>
  mainStore.movies != 0 ? mainStore.fetchMovie() : mainStore.fetchMovie()
);
if (playVideo) {
  setTimeout(() => {
    playVideo.value = false;
  }, 60000);
}
</script>
<template>
  <div
    v-show="mainStore.movie.backdrop_path"
    class="billboard"
    :style="`background-image: url('${
      mainStore.imagesUrl + mainStore.movie.backdrop_path
    }');`"
  >
    <iframe
      v-if="playVideo && mainStore.TrailerUrl"
      class="billboard"
      style="z-index: 0"
      :src="muted ? mainStore.TrailerUrl + '1' : mainStore.TrailerUrl"
      title="Offical Trailer"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
    <div class="billboard-content">
      <h1>{{ mainStore.movie.title }}</h1>

      <!--<Transition name="slide-fade"></Transition>-->
      <p>
        {{ mainStore.movie.overview }}
      </p>

      <div class="billboard-buttons">
        <button class="button button-white margin-r-05" @click="play">
          <i class="bx bxs-right-arrow"></i>&nbsp;Play
        </button>
        <RouterLink to="/">
          <button class="button button-gray margin-r-05">
            <i class="bx bx-info-circle"></i>&nbsp;Read more
          </button></RouterLink
        >
        <button
          v-show="(mainStore.TrailerUrl, playVideo)"
          class="button button-gray margin-r-05"
          @click="muted = !muted"
        >
          <i :class="muted ? 'bx bx-volume-mute' : 'bx bx-volume-full'"></i>
        </button>
        <button
          @click="playVideo = true"
          v-show="(mainStore.TrailerUrl, !playVideo)"
          class="button button-gray"
        >
          <i class="bx bx-refresh"></i>
        </button>
      </div>
    </div>
    <div class="billboard-overlay"></div>
  </div>
</template>
