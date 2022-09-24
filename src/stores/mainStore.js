import { defineStore } from 'pinia';

export const UseMainStore = defineStore({
  id: 'mainStore',

  state: () => ({
    imagesUrl: 'https://image.tmdb.org/t/p/w500',
    lang:
      window.navigator.language == 'tr' ? 'tr-TR' : window.navigator.language,
    type: ['movie', 'tv'],
  }),
});
