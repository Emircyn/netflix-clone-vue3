import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: import(/* webpackPrefetch: true */ '../views/HomeView.vue'),
    },
    {
      path: '/tv',
      name: 'tvs',

      component: import(/* webpackPrefetch: true */ '../views/tvSeries.vue'),
    },
    {
      path: '/movie',
      name: 'movies',

      component: import(/* webpackPrefetch: true */ '../views/Movie.vue'),
    },
    {
      path: '/movie/:id',
      name: 'movie',

      component: import(/* webpackPrefetch: true */ '../views/movieDetail.vue'),
    },

    {
      path: '/tv/:id',
      name: 'tv',

      component: import(/* webpackPrefetch: true */ '../views/movieDetail.vue'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
  linkActiveClass: 'active',
});

export default router;
