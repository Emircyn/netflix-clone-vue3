<script setup>
import { onMounted, inject, reactive } from 'vue';
import { UseMainStore } from '../stores/mainStore';

const appAxios = inject('appAxios');
const router = inject('router');
const mainStore = UseMainStore();

const state = reactive({
  details: [],
});

onMounted(() => {
  appAxios
    .get(
      `/${router.currentRoute._value.name}/${
        router.currentRoute._value.params.id
      }?api_key=${import.meta.env.VITE_APP_API_KEY}&language=${mainStore.lang}`
    )
    .then((response) => {
      state.details = response.data;
    });
});
</script>

<template>
  <div class="content-grid">
    <div class="content">
      <div class="img">
        <img
          :src="mainStore.imagesUrl + state.details.poster_path"
          draggable="false"
        />
        <button class="button button-more margin-i-auto">
          <span
            ><a
              :href="
                (state.details.homepage || []).length > 0
                  ? state.details.homepage
                  : href
              "
              :class="
                (state.details.homepage || []).length > 0 ? null : 'isDisabled'
              "
              >Homepage</a
            ></span
          >
        </button>
      </div>
      <div class="content-txt">
        <h1>
          {{ state.details.name ? state.details.name : state.details.title }}
        </h1>
        <p>{{ state.details.overview }}</p>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="view-element">
      <h2>the lead actors</h2>
      <!-- <swiper
            :navigation="true"
            :slidesPerView="7"
            :spaceBetween="10"
             :breakpoints="swiperOptions.breakpoints"
            :modules="modules"
            class="mySwiper"
        >
            <swiper-slide v-for="item in cast" :key="item" :style="{backgroundImage: 'url(' + imagesUrl+item.profile_path + ')' }" >
              <div class="actors-content">
                <h2>{{item.name}}</h2>
              </div>
            </swiper-slide>
            
            
        </swiper> -->
    </div>
    <div class="view-element">
      <h2>name</h2>
      <!-- <iframe width="100%" height="auto" :src="link" :title="movie.name || movie.title"  frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->
    </div>
    <div class="view-element">
      <h2 v-if="router.currentRoute._value.name == 'tv'">Current Season</h2>
      <div class="about">
        <div
          class="img"
          :style="`background-image: url('${
            mainStore.imagesUrl + state.details.backdrop_path
          }');`"
        ></div>
        <div class="content">
          <h2 class="header">
            {{ state.details.title || state.details.name }}
          </h2>
          <p class="about-small-header">
            {{
              (state.details.genres || []).length > 0
                ? state.details.genres.map((x) => x.name)
                : null
            }}
          </p>
          <p class="about-small-header">
            {{ state.details.release_date || state.details.number_of_seasons
            }}<span v-if="router.currentRoute._value.name == 'tv'">{{
              mainStore.lang == 'tr' ? ' Sezon' : ' Season'
            }}</span>
          </p>
          <p class="about-txt">{{ state.details.tagline }}</p>
          <p class="about-txt">
            {{ state.details.first_air_date }}
            {{ state.details.title || state.details.name }}
            {{ state.details.status }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.isDisabled {
  color: fff;
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
