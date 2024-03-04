export default [
  {
    path: '/eventos/:id?',
    name: 'Eventos',
    component: () => import(/* webpackChunkName "Eventos" */ '@/views/EventosView.vue'),
    meta: { navbar: true }
  },
]