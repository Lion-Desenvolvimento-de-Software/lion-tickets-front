import { createRouter, createWebHistory } from 'vue-router'
import ProdutosView from '@/views/ProdutosView.vue'
import UserView from '@/views/UserView.vue'
import callback from '@/views/callback'

import userManager from '@/services/userManager'

const routes = [
  ...require(/* webpackChunkName: "Home" */ '@/router/Home').default,
  ...require(/* webpackChunkName: "Eventos" */ '@/router/Eventos/Eventos').default,
  ...require(/* webpackChunkName: "ConfirmacaoCodigo" */ '@/router/admin/Admin').default,
  ...require(/* webpackChunkName: "ConfirmacaoCodigo" */ '@/router/errors/NotFound').default,
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
  return await userManager.getUser() ? true : false;
}

router.beforeEach(async (to, from, next) => {
  await userManager.clearStaleState();
  var user = await userManager.getUser();
  
  if (to.matched.some(record => record.meta.requiresAuth)){

    if(user != null && to.meta.roles.some(item => item == user?.profile?.role)) next();
    else next("/not-found");

  } else {

    if ((await isAuthenticated()) && to.path == '/login') next({ path: from.path })

  }
  next()
})

export default router
