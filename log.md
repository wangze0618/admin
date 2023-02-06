1. Pinia数据持久化

   - 下载 Pinia持久化插件 pinia-plugin-persistedstate
     ```bash
     npm i pinia-plugin-persistedstate
     ```

   - 在入口文件main.ts里注册使用
   
     ```typescript
     import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
     //...
     app.use(createPinia().use(piniaPluginPersistedstate))
     ```
     
   - 在store文件里使用：
   
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
   
     