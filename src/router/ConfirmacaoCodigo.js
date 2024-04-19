export default [
  {
    path: '/confirmacao-codigo/:email',
    name: 'ConfirmacaoCodigo',
    component: () => import('@/views/ConfirmacaoCódigoView.vue'),
    meta: { navbar: false }
  },
]