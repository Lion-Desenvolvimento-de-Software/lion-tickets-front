export default [
  {
    path: '/admin/login',
    name: 'LoginAdmin',
    component: () => import('@/views/admin/login'),
    meta: { navbar: false }
  },
]