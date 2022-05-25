<script setup>
import BillboardVue from '../components/Billboard.vue';
import SwiperVue from '../components/Swiper.vue';
</script>
<template>
  <BillboardVue />
  <Suspense>
    <SwiperVue netflix_title="Netflix'te Popüler Diziler" />
    <template #fallback> Loading... </template>
  </Suspense>
</template>
