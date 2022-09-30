<script setup>
import { onMounted, reactive, inject } from '@vue/runtime-core';
import { UseMainStore } from '../stores/mainStore';

const mainStore = UseMainStore();
const appAxios = inject('appAxios');
const router = inject('router');

const state = reactive({
  fetchData: [],
});

onMounted(async () => {
  await appAxios
    .get(
      `/trending/all/week?api_key=${import.meta.env.VITE_APP_API_KEY}&page=1`
    )
    .then((response) => {
      const movie = response.data.results.filter(
        (data) => data.backdrop_path !== null
      );

      state.fetchData = movie[Math.floor(Math.random() * 19) + 1];
    });
});
</script>
<template>
  <div class="cont">
    <div
      class="backgrond-404"
      :style="`background-image:url(${
        mainStore.bgUrl + state.fetchData.backdrop_path
      })`"
    ></div>
    <div class="content">
      <img src="/img/404-error-animate.svg" alt="" />
      <div style="margin: 0 15px">
        <p style="text-align: center; font-size: 1.5em; color: #fff">
          Lost your way?
        </p>
        <p style="text-align: center; font-size: 1em; color: #fff">
          Sorry, we can find that this page. You'll find loads to explore on the
          home page.
        </p>
      </div>
      <button class="button" @click="router.push('/')">Netflix Home</button>
    </div>
  </div>
</template>

<style scoped>
.backgrond-404 {
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.3;
  z-index: 3;
  width: 100%;
  height: 100vh;
  background-size: cover;
}
img {
  opacity: 0.9;
  width: 100%;
  height: 100%;
}
.content {
  position: absolute;
  top: 50%; /* position the top  edge of the element at the middle of the parent */
  left: 50%; /* position the left edge of the element at the middle of the parent */
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  z-index: 50;
  justify-content: center;
}
</style>
