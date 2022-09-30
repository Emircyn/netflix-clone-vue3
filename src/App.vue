<script setup>
import { inject } from 'vue';
import LoadingVue from './components/Loading.vue';
import { UseMainStore } from './stores/mainStore';
const mainStore = UseMainStore();
const router = inject('router');
router.currentRoute._value.name != 'search' ? (mainStore.query = '') : null;
</script>

<template>
  <HeaderVue />
  <RouterView />
  <FooterVue />
</template>

<style>
@import '@/assets/base.css';
</style>
