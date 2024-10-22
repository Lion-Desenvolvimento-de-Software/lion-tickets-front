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
        path: 'ingressos-produtos',
        name: 'IngressosProdutosAdmin',
        component: () => import('@/views/admin/ingressos-produtos'),
        children: [
          {
            path: 'new',
            name: 'IngressosProdutosAdmin',
            component: () => import('@/components/FormAdmin/Form.vue'),
          },
          {
            path: ':id',
            name: 'IngressosProdutosAdmin',
            component: () => import('@/components/FormAdmin/Form.vue'),
            props: { Nome: "" }
          }
        ]
      },
      {
        path: 'organizacoes',
        name: 'OrganizationAdmin',
        component: () => import('@/views/admin/Organization/organization.vue'),
        meta: { roles: ['Admin'] },
        children: [
          {
            path: 'new',
            name: 'OrganizationAdmin',
            component: () => import('@/components/FormAdmin/Form.vue'),
          },
          {
            path: ':id',
            name: 'OrganizationAdmin',
            component: () => import('@/components/FormAdmin/Form.vue'),
            props: { Nome: "" }
          }
        ]
      },
      {
        path: 'organizacoes/:id',
        name: 'Organization',
        component: () => import('@/views/Organization/Organization.vue'),
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