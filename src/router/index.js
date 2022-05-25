import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import tvSeries from '../views/tvSeries.vue';
import Movie from '../views/Movie.vue';
import movieDetail from '../views/movieDetail.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/tv-series',
      name: 'tv-series',

      component: tvSeries,
    },
    {
      path: '/movies',
      name: 'movies',

      component: Movie,
    },
    {
      path: '/movies/:id',
      name: 'moviesDetail',

      component: movieDetail,
    },

    {
      path: '/tv-series/:id',
      name: 'tvDetail',

      component: movieDetail,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
  linkActiveClass: 'active',
});

export default router;
