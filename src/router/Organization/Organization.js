const organizationRoutes = [
  {
    path: "/organizacoes/:id",
    name: "Organization",
    component: () => import('@/views/Organization/Organization.vue'),
    meta: { navbar: true },
    children: [
      {
        path: 'evento/:id',
        name: 'Evento',
        component: () => import('@/views/EventosView.vue')
      }
    ]
  }
]

export default organizationRoutes;