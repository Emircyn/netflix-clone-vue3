<script setup>
import { onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import FooterVue from './components/Footer.vue';
import HeaderVue from './components/Header.vue';
import LoadingVue from './components/Loading.vue';
import { UseMainStore } from './stores/mainStore';
const mainStore = UseMainStore();
onMounted(() => {
  mainStore.fetchTvs();
});
</script>

<template>
  <HeaderVue />
  <LoadingVue v-if="mainStore.movies.code" />
  <RouterView v-else />
  <FooterVue />
</template>

<style>
@import '@/assets/base.css';
</style>
