export default [
  {
    path: '/cadastro-externo/:id',
    name: 'CadastroExterno',
    component: () => import(/* webpackChunkName: "login" */ '@/views/CadastroExterno/CadastroExterno.vue'),
    meta: { navbar: false }
  }
]