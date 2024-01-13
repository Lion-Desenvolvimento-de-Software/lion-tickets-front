import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

axios.defaults.baseURL = 'https://localhost:44361'
axios.defaults.headers.common['Content-Type'] = 'application/json'

createApp(App).use(store).use(router).mount('#app')
