export default [
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('@/views/Payment/CheckoutView.vue'),
    props: true,
    meta: { navbar: true }
  }
]