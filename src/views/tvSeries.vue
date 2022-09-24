<script setup>
import { defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';
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
        <BillboardVue type="tv" />
        <SwiperVue
          v-for="(value, key) in 30"
          :key="key"
          :page="key + 1"
          type="tv"
        />
      </main>
    </template>
    <template #fallback>
      <LoadingVue />
    </template>
  </Suspense>
</template>
