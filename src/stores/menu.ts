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
