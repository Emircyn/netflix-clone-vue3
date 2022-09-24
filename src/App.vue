<script setup>
import { onMounted } from 'vue';
import LoadingVue from './components/Loading.vue';
import { UseMainStore } from './stores/mainStore';
const mainStore = UseMainStore();
</script>

<template>
  <HeaderVue />
  <RouterView />
  <FooterVue />
</template>

<style>
@import '@/assets/base.css';
</style>
