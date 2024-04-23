import { createRouter, createWebHistory } from 'vue-router'
import ProdutosView from '@/views/ProdutosView.vue'
import UserView from '@/views/UserView.vue'

const routes = [
  ...require(/* webpackChunkName: "login" */ '@/router/Login/LoginRoutes').default,
  ...require(/* webpackChunkName: "Home" */ '@/router/Home').default,
  ...require(/* webpackChunkName: "Eventos" */ '@/router/Eventos/Eventos').default,
  ...require(/* webpackChunkName: "ConfirmacaoCodigo" */ '@/router/ConfirmacaoCodigo').default,
  {
    path: '/produtos/:productsName?/:id?',
    name: 'Produtos',
    component: ProdutosView,
    meta: { navbar: true }
  },
  {
    path: '/usuarios/:Id',
    name: 'Usuarios',
    component: UserView,
    props: true,
    meta: { navbar: true }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from) => {
  if(!await canUserAccess(to)) return { path: from.path }
})

async function canUserAccess(to) {
  if(window.localStorage.getItem("isAuthenticated") && to.name == 'Login') return false;
  return true;
}

export default router
