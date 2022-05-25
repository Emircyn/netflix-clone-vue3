<script setup>
import BillboardVue from '../components/Billboard.vue';
import LoadingVue from '../components/Loading.vue';
import SwiperVue from '../components/Swiper.vue';
</script>
<template>
  <BillboardVue />
  <Suspense>
    <template #fallback>
      <LoadingVue />
    </template>
    <SwiperVue netflix_title="Netflix'te Popüler Filmler" />
  </Suspense>
</template>
