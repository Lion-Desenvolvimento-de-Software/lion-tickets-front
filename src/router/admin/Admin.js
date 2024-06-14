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
        name: 'HomeAdmin',
        component: () => import('@/views/admin/dashboard'),
      },
      {
        path: 'dashboard',
        name: 'DashboardAdmin',
        component: () => import('@/views/admin/dashboard'),
      },
      {
        path: 'produtos',
        name: 'ProdutosAdmin',
        component: () => import('@/views/admin/produtos'),
      },
      {
        path: 'empresas',
        name: 'EmpresasAdmin',
        component: () => import('@/views/admin/empresas'),
      },
      {
        path: 'usuarios',
        name: 'UsuariosAdmin',
        component: () => import('@/views/admin/usuarios'),
      },
    ]
  },
]