import { createRouter, createWebHistory } from 'vue-router'
import ProdutosView from '@/views/ProdutosView.vue'
import UserView from '@/views/UserView.vue'
import callback from '@/views/callback'

import userManager from '@/services/userManager'

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
    meta: { 
      navbar: true, 
      requiresAuth: true
    }
  },
  {
    path: '/callback',
    name: 'Callback',
    component: callback,
    meta: { navbar: false }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

const isAuthenticated = async () => {
  return await userManager.getUser();
}

router.beforeEach(async (to, from, next) => {

  if (to.matched.some(record => record.meta.requiresAuth)){
    if(!isAuthenticated() && this.$route.name == 'login') next({ path: '/login', query: { redirect: to.fullPath } });
    else next();
  } else {
    console.log(to, from);
    if (isAuthenticated() && to.path == '/login') next({ path: from.path })
    next();
  }
})

export default router
