<script setup>
import { defineAsyncComponent } from 'vue';
import LoadingVue from '../components/Loading.vue';
const SwiperVue = defineAsyncComponent(() =>
  import('../components/Swiper.vue')
);
const BillboardVue = defineAsyncComponent(() =>
  import('../components/Billboard.vue')
);
</script>
<template>
  <Suspense>
    <template #default>
      <main>
        <BillboardVue />
        <SwiperVue netflix_title="Netflix'te Popüler Filmler" />
      </main>
    </template>
    <template #fallback>
      <LoadingVue />
    </template>
  </Suspense>
</template>
