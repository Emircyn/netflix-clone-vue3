import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () =>
        import(/* webpackChunkName: home */ '../views/HomeView.vue'),
    },
    {
      path: '/search',
      name: 'search',
      component: () =>
        import(/* webpackChunkName: search */ '../views/SearchView.vue'),
    },
    {
      path: '/tv',
      name: 'tvs',

      component: () =>
        import(/* webpackChunkName: tvs */ '../views/tvSeries.vue'),
    },
    {
      path: '/movie',
      name: 'movies',

      component: () =>
        import(/* webpackChunkName: movies */ '../views/Movie.vue'),
    },
    {
      path: '/movie/:id',
      name: 'movie',

      component: () =>
        import(/* webpackChunkName: movie */ '../views/movieDetail.vue'),
    },

    {
      path: '/tv/:id',
      name: 'tv',

      component: () =>
        import(/* webpackChunkName: tv */ '../views/movieDetail.vue'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
  linkActiveClass: 'active',
});

export default router;
