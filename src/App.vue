<script setup>
import { onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import FooterVue from './components/Footer.vue';
import HeaderVue from './components/Header.vue';
import { UseMainStore } from './stores/mainStore';

const mainStore = UseMainStore();
onMounted(() => {
  mainStore.fetchMovies();
});
</script>

<template>
  <HeaderVue />
  <RouterView />
  <FooterVue />
</template>

<style>
@import '@/assets/base.css';
</style>
