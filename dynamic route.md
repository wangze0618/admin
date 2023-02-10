1. 动态路由 router.addRouter() 动态添加路由。按钮权限设置（不同用户的权限）

   1️⃣、在`menu.ts`文件中设置 `addMenu()`

   ```typescript
   import { ref } from "vue"
   import { defineStore } from "pinia"
   
   export const useMenuStore = defineStore(
     "menu",
     () => {
       const menu = ref([])
       const setMenu = (data) => {
         menu.value = data
       }
       const clearMenu = () => {
         menu.value = []
       }
   
       type obj = {
         [key: string]: any
       }
       /**
        *
        * @param router 路由器对象
        */
       const addMenu = (router) => {
         let newArr: object[] = []
   
         menu.value.forEach((item: obj) => {
           if (!menu.value) {
             return
           }
           if (item.children) {
             item.children = item.children.map((item) => {
               let url = `/src/views/${item.url}.vue`
               item.component = () => import(url)
               return item
             })
             newArr.push(...item.children)
           } else {
             let url = `/src/views/${item.url}.vue`
             item.component = () => import(url)
             newArr.push(item)
           }
         })
   
         newArr.forEach((item) => {
           // 与父一级路由的`name`一致
           router.addRoute("layout", item)   
         })
       }
       return {
         menu,
         setMenu,
         addMenu,
         clearMenu,
       }
     },
     {
       persist: {
         storage: sessionStorage,
       },
     }
   )
   ```

   2️⃣、在`login.vue`和`main.ts`入口文件使用
	
	```typescript
	// login.vue
	const onSubmit = async () => {
	  await formLogin.value?.validate(async (valid) => {
	    if (valid) {
	      try {
	        const { data: data1 } = await getMenu(data)
	        if (data1.code == 20000) {
	          // 先获取menu
	          menuStore.setMenu(data1.data.menu)
	          menuStore.addMenu(router)
	          Cookies.set("token", data1.data.token)
	          router.push({
	            name: "home",
	          })
	        } else {
	          return ElMessage.error(`登录失败，${data1.data.message}`)
	        }
	      } catch (error) {}
	    }
	  })
	}
	
	// main.ts
	import { useMenuStore } from "@/stores/menu"
	
	const app = createApp(App)
	app.use(createPinia().use(piniaPluginPersistedstate))
	
	const menuStore = useMenuStore()
	// ❗❗解决页面刷新后出现白屏的问题--调用一下❗❗
	menuStore.addMenu(router) 

3️⃣、路由文件 及 路由守卫

```typescript
// router/index.ts
import { createRouter, createWebHistory } from "vue-router"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("@/views/Layout.vue"),
      name: "layout",
      redirect: "/home",
      children: [], // 这里是空数组
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login/index.vue"),
    },
  ],
})

export default router

// main.ts
import Cookie from "js-cookie"	
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
```

