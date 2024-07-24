import { createApp } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import userManager from './services/userManager'
import BootstrapVue from 'bootstrap-vue';

import { library } from '@fortawesome/fontawesome-svg-core'
import icons from './assets/icons/icons.js'

library.add(...icons);

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import "@/assets/styles/global.css"
import 'vue-advanced-cropper/dist/style.css';
import { Chart, DoughnutController, ArcElement, Tooltip } from 'chart.js';

Chart.register(DoughnutController, ArcElement, Tooltip);

axios.defaults.baseURL = 'https://localhost:44380'
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.withCredentials = true

axios.interceptors.request.use(async config => {
  await userManager.getUser().then(user => {
    console.log(user);
    if (user && !user.expired) {
      config.headers.Authorization = `Bearer ${user.access_token}`;
    }
  });

  return config
}, error => {
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  return response;
}, async (error) => {
  if (error.response && error.response.status === 401) {
    await userManager.signinRedirect();
  }
  return Promise.reject(error);
})

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon).use(BootstrapVue).use(store).use(router).mount('#app')

