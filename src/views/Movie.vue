<script setup>
import { defineAsyncComponent, ref } from 'vue';
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
    pages.value += 2;
  }, 500);
});
</script>
<template>
  <Suspense>
    <template #default>
      <main>
        <BillboardVue />
        <SwiperVue
          v-for="(value, key) in pages"
          :key="key"
          :page="key + 1"
          type="movie"
        />
      </main>
    </template>
    <template #fallback>
      <LoadingVue />
    </template>
  </Suspense>
</template>
