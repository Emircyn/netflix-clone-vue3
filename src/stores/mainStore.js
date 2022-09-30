import { defineStore } from 'pinia';
import { watch } from 'vue';

export const UseMainStore = defineStore({
  id: 'mainStore',

  state: () => ({
    imagesUrl: 'https://image.tmdb.org/t/p/w300',
    bgUrl: 'https://image.tmdb.org/t/p/original',
    lang:
      window.navigator.language == 'tr' ? 'tr-TR' : window.navigator.language,
    type: ['movie', 'tv'],
    query: '',
  }),
});
