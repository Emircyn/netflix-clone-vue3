import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () =>
        import(/* webpackChunkName: "group-index" */ '../views/HomeView.vue'),
    },
    {
      path: '/search',
      name: 'search',
      component: () =>
        import(/* webpackChunkName: "group-index" */ '../views/SearchView.vue'),
    },
    {
      path: '/tv',
      name: 'tvs',

      component: () =>
        import(/* webpackChunkName: "group-index" */ '../views/tvSeries.vue'),
    },
    {
      path: '/movie',
      name: 'movies',

      component: () =>
        import(/* webpackChunkName: "group-index" */ '../views/Movie.vue'),
    },
    {
      path: '/movie/:id',
      name: 'movie',

      component: () =>
        import(
          /* webpackChunkName: "group-index" */ '../views/movieDetail.vue'
        ),
    },

    {
      path: '/tv/:id',
      name: 'tv',

      component: () =>
        import(
          /* webpackChunkName: "group-index" */ '../views/movieDetail.vue'
        ),
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',

      component: () =>
        import(/* webpackChunkName: "group-index" */ '../views/404.vue'),
    },
    {
      path: '/404-page',
      name: '404-page',

      component: () =>
        import(/* webpackChunkName: "group-index" */ '../views/404.vue'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
  linkActiveClass: 'active',
});

export default router;
