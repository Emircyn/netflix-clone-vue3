<script setup>
import { defineAsyncComponent } from 'vue';
import LoadingVue from '../components/Loading.vue';
import { UseMainStore } from '../stores/mainStore';

const BillboardVue = defineAsyncComponent(() =>
  import('../components/Billboard.vue')
);
const mainStore = UseMainStore();

const SwiperVue = defineAsyncComponent({
  loader: () => import('../components/Swiper.vue'),
  loadingComponent: LoadingVue,
  delay: 200,
  timeout: 3000,
});
</script>
<template>
  <Suspense>
    <template #default>
      <main>
        <BillboardVue />
        <SwiperVue
          v-for="(value, key) in 30"
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
