import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { appAxios } from './utils/appAxios';
import VueLazyload from 'vue-lazyload';

import FooterVue from './components/Shared/Footer.vue';
import HeaderVue from './components/Shared/Header.vue';

import App from './App.vue';
import router from './router';

const app = createApp(App);
app.use(VueLazyload);

app.use(createPinia());
app.use(router);
app.component('FooterVue', FooterVue);
app.component('HeaderVue', HeaderVue);
app.provide('appAxios', appAxios);
app.provide('router', router);

app.mount('#app');
