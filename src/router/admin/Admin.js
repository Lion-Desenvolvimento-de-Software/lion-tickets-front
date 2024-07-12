export default [
  {
    path: '/admin/login',
    name: 'LoginAdmin',
    component: () => import('@/views/admin/login'),
    meta: { navbar: false },
  },
  {
    path: '/admin',
    name: 'HomeAdmin',
    component: () => import('@/views/admin/home'),
    meta: { navbar: false, requiresAuth: true, roles: ['Admin', 'Gerente', 'Vendedor'] },
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
        component: () => import('@/views/admin/Empresa/empresas'),
        meta: { roles: ['Admin'] },
        children: [
          {
            path: 'new',
            name: 'EmpresasAdmin',
            component: () => import('@/components/FormAdmin/Form.vue'),
          },
          {
            path: ':id',
            name: 'EmpresasAdmin',
            component: () => import('@/components/FormAdmin/Form.vue'),
            props: { Nome: "" }
          }
        ]
      },
      {
        path: 'usuarios',
        name: 'UsuariosAdmin',
        component: () => import('@/views/admin/usuarios'),
        meta: { roles: ['Admin', 'Gerente'] },
        children: [
          {
            path: 'new',
            name: 'UsuariosAdmin',
            component: () => import('@/components/FormAdmin/Form.vue'),
          },
          {
            path: ':id',
            name: 'UsuariosAdmin',
            component: () => import('@/components/FormAdmin/Form.vue')
          }
        ]
      },
    ]
  },
]