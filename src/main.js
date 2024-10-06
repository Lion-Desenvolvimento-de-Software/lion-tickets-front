import { createApp, configureCompat } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from "@fortawesome/free-solid-svg-icons"
import { far } from "@fortawesome/free-regular-svg-icons"
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import userManager from './services/userManager'
import BootstrapVue from 'bootstrap-vue';

import ToastPersonalizado from './components/toasts/toastPersonalizado.vue'

import { library } from '@fortawesome/fontawesome-svg-core'

library.add(far);
library.add(fas);

//import "bootstrap/dist/css/bootstrap.min.css"
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

axios.interceptors.response.use(response => {
  return response;
}, async (error) => {
  if (error.response && error.response.status === 401) {
    await userManager.signinRedirect();
  }
  return Promise.reject(error);
})

const app = createApp(App);

app.component('toast-personalizado', ToastPersonalizado).component("font-awesome-icon", FontAwesomeIcon).use(BootstrapVue).use(store).use(router).mount('#app')

configureCompat({
  WATCH_ARRAY: 'suppress-warning',
  RENDER_FUNCTION: 'suppress-warning',
  INSTANCE_LISTENERS: 'suppress-warning',
  COMPONENT_FUNCTIONAL: 'suppress-warning',
  OPTIONS_BEFORE_DESTROY: 'suppress-warning',
  INSTANCE_SCOPED_SLOTS: 'suppress-warning',
  OPTIONS_DATA_MERGE: 'suppress-warning',
  COMPONENT_V_MODEL: 'suppress-warning',
  CUSTOM_DIR: 'suppress-warning',
  INSTANCE_EVENT_EMITTER: 'suppress-warning',
  ATTR_FALSE_VALUE: 'suppress-warning',
  INSTANCE_ATTRS_CLASS_STYLE: 'suppress-warning',
  GLOBAL_PROTOTYPE: 'suppress-warning',
  GLOBAL_EXTEND: 'suppress-warning',
  GLOBAL_MOUNT: 'suppress-warning',
  OPTIONS_DESTROYED: 'suppress-warning',
  INSTANCE_DESTROY: 'suppress-warning',
});

