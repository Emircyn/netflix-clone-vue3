<script setup>
import { defineAsyncComponent, ref } from 'vue';
import LoadingVue from '../components/Loading.vue';
import { UseMainStore } from '../stores/mainStore';

const BillboardVue = defineAsyncComponent(() =>
  import('../components/Billboard.vue')
);
const SwiperVue = defineAsyncComponent({
  loader: () => import('../components/Swiper.vue'),
  loadingComponent: LoadingVue,
  delay: 200,
  timeout: 3000,
});
const mainStore = UseMainStore();
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
          :type="mainStore.type[Math.floor(Math.random() * 2)]"
        />
      </main>
    </template>
    <template #fallback>
      <LoadingVue />
    </template>
  </Suspense>
</template>
