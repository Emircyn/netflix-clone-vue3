import axios from 'axios';
export const appAxios = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});