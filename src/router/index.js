import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EventosView from '@/views/EventosView.vue'
import ProdutosView from '@/views/ProdutosView.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: { navbar: false }
  },
  {
    path: '/cadastro',
    name: 'Cadastro',
    component: () => import(/* webpackChunkName: "cadastro" */ '../views/Cadastro.vue'),
    meta: { navbar: true }
  },
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: { navbar: true }
  },
  {
    path: '/eventos/:id?',
    name: 'Eventos',
    component: EventosView,
    meta: { navbar: true }
  },
  {
    path: '/produtos/:productsName?/:id?',
    name: 'Produtos',
    component: ProdutosView,
    meta: { navbar: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
