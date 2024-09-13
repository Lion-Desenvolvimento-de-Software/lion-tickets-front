export default [
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/errors/NotFound.vue"),
    meta: { navBar: false }
  }
]