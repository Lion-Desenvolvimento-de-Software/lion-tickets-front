import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EventosView from '@/views/EventosView.vue'
import ProdutosView from '@/views/ProdutosView.vue'
import UserView from '@/views/UserView.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginAndCreatedView.vue'),
    meta: { navbar: false }
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
  },
  {
    path: '/usuarios/:UserName',
    name: 'Usuarios',
    component: UserView,
    meta: { navbar: false }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach(() => {
  
})

export default router
