export default [
  {
    path: '/admin/login',
    name: 'LoginAdmin',
    component: () => import('@/views/admin/login'),
    meta: { navbar: false }
  },
  {
    path: '/admin',
    name: 'HomeAdmin',
    component: () => import('@/views/admin/home'),
    meta: { navbar: false },
    children: [
      {
        path: '',
        name: 'AdminHome',
        component: () => import('@/views/admin/dashboard'),
      },
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: () => import('@/views/admin/dashboard'),
      },
    ]
  },
]