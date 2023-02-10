import { createRouter, createWebHistory } from "vue-router"
import Cookie from "js-cookie"
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
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login/index.vue"),
    },
  ],
})

router.beforeEach((to, from, next) => {
  // 判断token是否存在
  const token = Cookie.get("token")
  // 如果存在token
  if (token && to.path == "/login") {
    next("/")
  } else if (!token && to.path !== "/login") {
    next({
      name: "login",
    })
  } else {
    next()
  }
})

export default router
