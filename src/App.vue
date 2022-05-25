<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import FooterVue from './components/Footer.vue';
import HeaderVue from './components/Header.vue';
import noInternetVue from './components/noInternet.vue';
import { UseMainStore } from './stores/mainStore';
console.log(navigator.onLine);
const internet = ref(true);
const mainStore = UseMainStore();
onMounted(() => {
  internet.value = navigator.online;
  mainStore.fetchMovies();
});
</script>

<template>
  <HeaderVue />
  <noInternetVue v-if="internet" />
  <RouterView v-else />
  <FooterVue />
</template>

<style>
@import '@/assets/base.css';
</style>
