import { createRouter, createWebHashHistory } from 'vue-router';
const HomeView = () => import('../views/HomeView.vue');
const tvSeries = () => import('../views/tvSeries.vue');
const Movie = () => import('../views/Movie.vue');
const movieDetail = () => import('../views/movieDetail.vue');

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
