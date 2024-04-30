import { createApp } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import { library } from '@fortawesome/fontawesome-svg-core'
import icons from './assets/icons/icons.js'

library.add(...icons);

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "@/assets/styles/global.css"

axios.defaults.baseURL = 'https://localhost:44361'
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.withCredentials = true


createApp(App).component("font-awesome-icon", FontAwesomeIcon).use(store).use(router).mount('#app')
