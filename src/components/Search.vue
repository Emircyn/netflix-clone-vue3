<script setup>
import { ref, inject, watch, onMounted } from 'vue';
import { UseMainStore } from '../stores/mainStore';
const mainStore = UseMainStore();

const isActive = ref(false);
const myInput = ref(null);
const query = ref('');

const router = inject('router');

const activeInput = () => {
  isActive.value
    ? (isActive.value = false && myInput.value.blur())
    : (isActive.value =
        true &&
        setTimeout(function () {
          myInput.value.focus();
        }, 500) &&
        router.push('/search'));
};
watch(router.currentRoute, () => {
  router.currentRoute._value.name !== 'search'
    ? ((query.value = ''), (mainStore.query = ''), (isActive.value = false))
    : null;
});
watch(query, () => {
  query.value.length > 0
    ? ((mainStore.query = query.value), router.push(`/search?q=${query.value}`))
    : null;
});
onMounted(() => {
  router.currentRoute._value
    ? setTimeout(() => {
        router.currentRoute._value.query.q
          ? (mainStore.query = router.currentRoute._value.query.q)
          : (mainStore.query = '');
      }, 500)
    : null;
});
</script>
<template>
  <div class="search-box" :class="{ active: isActive }">
    <div class="icon" @click="activeInput">
      <i :class="`bx ${isActive ? 'bx-exit' : 'bx-search-alt-2'}`"></i>
    </div>
    <div class="input">
      <input
        ref="myInput"
        type="search"
        name="search"
        id="search"
        v-model="query"
        autocomplete="off"
        :placeholder="`${mainStore.lang == 'tr-TR' ? 'Ara' : 'Type Search'}`"
      />
    </div>
  </div>
</template>
<style>
input[type='search']::-webkit-search-cancel-button {
  -webkit-appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50em;
  background: url(https://pro.fontawesome.com/releases/v5.10.0/svgs/solid/times-circle.svg)
    no-repeat 50% 50%;
  background-size: contain;
  background-color: #fff;
  opacity: 0;
  pointer-events: none;
  margin: 2.5px 5px 2.5px 5px;
}
input[type='search']:focus::-webkit-search-cancel-button {
  opacity: 0.3;
  pointer-events: all;
}

input[type='search'].dark::-webkit-search-cancel-button {
  filter: invert(1);
}
</style>
