<script setup>
import { defineAsyncComponent } from 'vue';
import LoadingVue from '../components/Loading.vue';
const SwiperVue = defineAsyncComponent(() =>
  import('../components/Swiper.vue')
);
const BillboardVue = defineAsyncComponent(() =>
  import('../components/Billboard.vue')
);
const type = ['movie', 'tv'];

const random = Math.floor(Math.random() * 2);
</script>
<template>
  <Suspense>
    <template #default>
      <main>
        <BillboardVue :type="type[Math.floor(Math.random() * 2)]" />
        <SwiperVue
          :type="type[Math.floor(Math.random() * 2)]"
          netflix_title="Netflix'te Popüler"
        />
      </main>
    </template>
    <template #fallback>
      <LoadingVue />
    </template>
  </Suspense>
</template>
