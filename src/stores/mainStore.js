import axios from 'axios';
import { defineStore } from 'pinia';

export const UseMainStore = defineStore({
  id: 'mainStore',

  state: () => ({
    movies: [],
    movie: [],
    tvs: [],
    tv: [],
    officialTrailer: null,
    TrailerUrl: null,
    officialTvTrailer: null,
    TrailerTvUrl: null,
    movieSelect: Math.floor(Math.random() * 20),
    apiKey: import.meta.env.VITE_APP_API_KEY,
    imagesUrl: 'https://image.tmdb.org/t/p/original',
    lang: 'tr-TR',
    baseURL: 'https://api.themoviedb.org/3/',
    type: ['movie', 'tv'],
    counter: 1,
  }),

  actions: {
    async fetchMovies() {
      try {
        let response = await axios.get(
          this.baseURL +
            this.type[0] +
            `/popular?api_key=${this.apiKey}&language=${this.lang}&page=` +
            this.counter
        );
        this.movies = response.data;
      } catch (err) {
        console.log(err);
        this.movies = err;
      }
    },
    async fetchTvs() {
      try {
        let response = await axios.get(
          this.baseURL +
            this.type[1] +
            `/popular?api_key=${this.apiKey}&language=${this.lang}&page=` +
            this.counter
        );
        this.tvs = response.data;
      } catch (err) {
        console.log(err);
        this.tvs = err;
      }
    },
    async fetchTv() {
      try {
        let response = await axios.get(
          this.baseURL +
            this.type[1] +
            `/${this.tvs.results[this.movieSelect].id}?api_key=${
              this.apiKey
            }&append_to_response=videos&language=${this.lang}`
        );

        this.tv = response.data;
        let videos = await axios.get(
          this.baseURL +
            this.type[1] +
            '/' +
            this.tvs.results[this.movieSelect].id +
            '/videos?api_key=' +
            this.apiKey +
            '&language=' +
            this.lang
        );
        this.officialTvTrailer = videos.data.results.filter(
          (vid) => vid.type == 'Trailer'
        );
        this.TrailerTvUrl =
          'https://www.youtube-nocookie.com/embed/' +
          this.officialTvTrailer[0].key +
          '?vq=hd720&autoplay=1&controls=0&rel=0&mute=';
      } catch (err) {
        this.videos = err;
      }
    },
    async fetchMovie() {
      try {
        let response = await axios.get(
          this.baseURL +
            this.type[0] +
            `/${this.movies.results[this.movieSelect].id}?api_key=${
              this.apiKey
            }&append_to_response=videos&language=${this.lang}`
        );

        this.movie = response.data;

        this.officialTrailer = response.data.videos.results.filter(
          (vid) => vid.type == 'Trailer'
        );
        this.TrailerUrl =
          'https://www.youtube-nocookie.com/embed/' +
          this.officialTrailer[0].key +
          '?vq=hd720&autoplay=1&controls=0&rel=0&mute=';
      } catch (err) {
        this.videos = err;
      }
    },
  },
});
