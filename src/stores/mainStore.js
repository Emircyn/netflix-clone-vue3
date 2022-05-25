import axios from 'axios';
import { defineStore } from 'pinia';

export const UseMainStore = defineStore({
  id: 'mainStore',

  state: () => ({
    movies: [],
    movie: [],
    officialTrailer: null,
    TrailerUrl: null,
    movieSelect: Math.floor(Math.random() * 20),
    apiKey: import.meta.env.VITE_APP_API_KEY,
    imagesUrl: 'https://image.tmdb.org/t/p/original',
    lang: 'tr-TR',
  }),
  actions: {
    async fetchMovies() {
      try {
        let response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=${this.lang}&page=1`
        );
        this.movies = response.data;
      } catch (err) {
        console.log(err);
        this.movies = err;
      }
    },
    async fetchMovie() {
      try {
        let response = await axios.get(
          `https://api.themoviedb.org/3/movie/${
            this.movies.results[this.movieSelect].id
          }?api_key=${this.apiKey}&append_to_response=videos&language=${
            this.lang
          }`
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
