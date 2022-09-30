<script setup>
import { ref, inject } from 'vue';
import Search from '../Search.vue';
const router = inject('router');
const menuContext = ref(['Anasafya', 'Diziler', 'Filmler']);
const menuURL = ref(['/', '/tv', '/movie']);
const menuIcon = ref(['bx-home-alt', 'bx-tv', 'bx-camera-movie']);

// const subIsActive = (input) => {
//   const paths = Array.isArray(input) ? input : [input];
//   return paths.some((path) => {
//     return router.path.indexOf(path) === 0;
//   });
// };
</script>

<template>
  <nav id="navbar" class="sticky">
    <div class="left-side">
      <div class="logo margin-i-2">
        <RouterLink :to="menuURL[0]">
          <img
            v-lazy="
              `${'https://www.freepnglogos.com/uploads/netflix-logo-0.png'}`
            "
            draggable="false"
            lazy="loading"
            alt="Logo"
            width="100"
        /></RouterLink>
      </div>
      <div class="menu">
        <ul>
          <li v-for="(menuContexts, index) in menuContext" :key="index">
            <RouterLink class="menu-link" :to="menuURL[index]">{{
              menuContexts
            }}</RouterLink>
          </li>
        </ul>
      </div>
    </div>
    <div class="right-side">
      <Search />
    </div>
  </nav>
  <div class="mobile-menu">
    <ul>
      <li v-for="(menuContexts, index) in menuContext" :key="index">
        <RouterLink class="menu-link" :to="menuURL[index]"
          ><i :class="`bx ${menuIcon[index]}`"></i
          ><span>{{ menuContexts }}</span></RouterLink
        >
      </li>
    </ul>
  </div>
</template>
<style>
.menu .active {
  color: #e50914;
  font-weight: 600;
  opacity: 1 !important;
}
.mobile-menu .active {
  background-color: #e50914;
  color: #fff;
  font-weight: 600;
  opacity: 1 !important;
}
</style>
