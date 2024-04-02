import { createRouter, createWebHistory } from 'vue-router'
import ProdutosView from '@/views/ProdutosView.vue'
import UserView from '@/views/UserView.vue'

const routes = [
  ...require(/* webpackChunkName: "login" */ '@/router/Login/LoginRoutes').default,
  ...require(/* webpackChunkName: "Home" */ '@/router/Home').default,
  ...require(/* webpackChunkName: "Eventos" */ '@/router/Eventos/Eventos').default,
  ...require(/* webpackChunkName: "CadastroExterno" */ '@/router/CadastroExterno/CadastroExterno').default,
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
    meta: { navbar: false }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach(() => {
  
})

export default router
