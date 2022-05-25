<script setup>
import { onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { UseMainStore } from './stores/mainStore';
const mainStore = UseMainStore();
onMounted(() => {
  mainStore.fetchMovies();
});
</script>

<template>
  <RouterView />
</template>

<style>
@import '@/assets/base.css';
</style>
