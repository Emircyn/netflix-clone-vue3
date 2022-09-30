<script setup>
import { defineAsyncComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import LoadingVue from '../components/Loading.vue';

const SwiperVue = defineAsyncComponent(() =>
  import('../components/Swiper.vue')
);
const BillboardVue = defineAsyncComponent(() =>
  import('../components/Billboard.vue')
);

let scroll = ref('');
let pages = ref(10);
window.addEventListener('scroll', (event) => {
  window.clearTimeout(scroll);
  scroll = setTimeout(() => {
    pages.value += 3;
  }, 500);
});
</script>
<template>
  <Suspense>
    <template #default>
      <main>
        <BillboardVue />
        <SwiperVue v-for="(value, key) in pages" :key="key" :page="key + 1" />
      </main>
    </template>
    <template #fallback>
      <LoadingVue />
    </template>
  </Suspense>
</template>
