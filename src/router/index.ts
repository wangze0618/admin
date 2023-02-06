import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("@/views/Layout.vue"),
      redirect: "/home",
      children: [
        {
          path: "home",
          name: "home",
          component: () => import("@/views/home/index.vue"),
        },
        {
          path: "mall",
          name: "mall",
          component: () => import("@/views/mall/index.vue"),
        },
        {
          path: "user",
          name: "user",
          component: () => import("@/views/user/index.vue"),
        },
        {
          path: "page1",
          name: "page1",
          component: () => import("@/views/page1/index.vue"),
        },
        {
          path: "page2",
          name: "page2",
          component: () => import("@/views/page2/index.vue"),
        },
      ],
    },
  ],
})

export default router
