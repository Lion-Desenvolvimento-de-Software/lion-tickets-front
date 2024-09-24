export default [
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/views/Payment/CartView.vue'),
    meta: { navbar: true }
  }
]