export default [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login/LoginAndSigninView.vue'),
    meta: { navbar: false }
  },
  {
    path: '/redefinicao-senha',
    name: 'RedefinicaoSenha',
    meta: { navbar: false }
  }
]