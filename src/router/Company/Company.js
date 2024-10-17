const companyRoutes = [
  {
    path: "company/:name",
    name: "Company",
    component: () => import('@/views/Company/Company.vue'),
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

export default companyRoutes;