import { createRouter, createWebHistory } from "vue-router"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("@/views/Layout.vue"),
      name: "layout",
      redirect: "/home",
      children: [],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login/index.vue"),
    },
  ],
})

export default router
