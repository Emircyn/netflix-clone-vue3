<script setup>
import Card from '../components/Card.vue';
import Loading from '../components/Loading.vue';
</script>
<template>
  <Suspense>
    <template #default>
      <Card />
    </template>
    <template #fallback>
      <Loading />
    </template>
  </Suspense>
</template>
