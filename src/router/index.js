import { createRouter, createWebHistory } from 'vue-router'
import ProdutosView from '@/views/ProdutosView.vue'
import UserView from '@/views/UserView.vue'
import callback from '@/views/callback'

import userManager from '@/services/userManager'

const routes = [
  ...require(/* webpackChunkName: "Home" */ '@/router/Home').default,
  ...require(/* webpackChunkName: "Eventos" */ '@/router/Eventos/Eventos').default,
  ...require(/* webpackChunkName: "ConfirmacaoCodigo" */ '@/router/ConfirmacaoCodigo').default,
  ...require(/* webpackChunkName: "ConfirmacaoCodigo" */ '@/router/admin/Admin').default,
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
  console.log(user?.profile)
  if (to.path.includes("/admin")){
    if ((user == null || user?.profile?.role == "Client") && !to.path.includes("/login")) {
      next({ path: '/' })
    }
  }
  else if (to.matched.some(record => record.meta.requiresAuth)){
    if(!await isAuthenticated() && this.$route.name == 'login') next({ path: '/login', query: { redirect: to.fullPath } });
    else next();
  } else {
    if (await isAuthenticated() && to.path == '/login') next({ path: from.path })
  }
  next();
})

export default router
