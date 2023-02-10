import { createApp } from "vue"
import { createPinia } from "pinia"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
import App from "./App.vue"
import router from "./router"
import "normalize.css"
import "./assets/style/main.css"
import "@/mock"
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
import "element-plus/dist/index.css"
import { useMenuStore } from "@/stores/menu"
import Cookie from "js-cookie"

const app = createApp(App)
app.use(createPinia().use(piniaPluginPersistedstate))
const menuStore = useMenuStore()

// 解决页面刷新后出现白屏的问题
menuStore.addMenu(router)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

const checkRoutes = (path) => {
  let hasCheck = router.getRoutes().filter((route) => route.path == path).length
  if (hasCheck) {
    return true
  } else {
    return false
  }
}

router.beforeEach((to, from, next) => {
  // 判断token是否存在
  const token = Cookie.get("token")

  if (!token && to.path !== "/login") {
    next({
      name: "login",
    })
  } else if (token && to.path == "/login") {
    next("/home")
  } else {
    next()
  }
})

app.use(router)

app.mount("#app")
