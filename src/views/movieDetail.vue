<script setup>
import View from '../components/View.vue';
import Loading from '../components/Loading.vue';
</script>
<template>
  <Suspense>
    <template #default>
      <View />
    </template>
    <template #fallback>
      <Loading />
    </template>
  </Suspense>
</template>
