export default [
  {
    path: '/admin/login',
    name: 'LoginAdmin',
    component: () => import('@/views/admin/login'),
    meta: { navbar: false }
  },
  {
    path: '/admin',
    name: 'Home',
    component: () => import('@/views/admin/home'),
    meta: { navbar: false }
  }
]