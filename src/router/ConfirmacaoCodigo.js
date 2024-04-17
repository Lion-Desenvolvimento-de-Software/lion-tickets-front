export default [
  {
    path: '/confirmacao-codigo/:id',
    name: 'ConfirmacaoCodigo',
    component: () => import('@/views/ConfirmacaoCódigoView.vue'),
    meta: { navbar: false }
  },
]