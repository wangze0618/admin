1. Pinia数据持久化

   - 下载 Pinia持久化插件 pinia-plugin-persistedstate

     // aside.ts
     import { ref } from "vue"
     import { defineStore } from "pinia"
     
     export const useAsideStore = defineStore("aside", {
       state: () => {
         let isCollapse = ref(false)
         return {
           isCollapse,
         }
       },
       actions: {
         toggleCollapse() {
           this.isCollapse = !this.isCollapse
         },
       },
       // 配置项
       persist: {
         storage: localStorage,
       },
     })
     

```
```bash
     npm i pinia-plugin-persistedstate
```

   - 在入口文件main.ts里注册使用


     // aside.ts
     import { ref } from "vue"
     import { defineStore } from "pinia"
     
     export const useAsideStore = defineStore("aside", {
       state: () => {
         let isCollapse = ref(false)
         return {
           isCollapse,
         }
       },
       actions: {
         toggleCollapse() {
           this.isCollapse = !this.isCollapse
         },
       },
       // 配置项
       persist: {
         storage: localStorage,
       },
     })


```
```typescript
     import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
     //...
     app.use(createPinia().use(piniaPluginPersistedstate))
```

​     

   - 在store文件里使用：


     // aside.ts
     import { ref } from "vue"
     import { defineStore } from "pinia"
     
     export const useAsideStore = defineStore("aside", {
       state: () => {
         let isCollapse = ref(false)
         return {
           isCollapse,
         }
       },
       actions: {
         toggleCollapse() {
           this.isCollapse = !this.isCollapse
         },
       },
       // 配置项
       persist: {
         storage: localStorage,
       },
     })


```
```typescript
     // aside.ts
     import { ref } from "vue"
     import { defineStore } from "pinia"
     
     export const useAsideStore = defineStore("aside", {
       state: () => {
         let isCollapse = ref(false)
         return {
           isCollapse,
         }
       },
       actions: {
         toggleCollapse() {
           this.isCollapse = !this.isCollapse
         },
       },
       // 配置项
       persist: {
         storage: localStorage,
       },
     })
```

2. 动态路由部分
添加

https://stackoverflow.com/questions/73198617/unknown-variable-dynamic-import-views-admin-home-vue-vue3-vue-router4


​     
