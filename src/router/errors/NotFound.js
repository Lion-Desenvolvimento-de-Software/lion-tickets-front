export default [
  {
    path: "/not-found",
    name: "NotFound",
    component: () => import("@/views/errors/NotFound.vue"),
    meta: { navBar: false }
  }
]