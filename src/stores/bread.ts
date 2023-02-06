import { ref } from "vue"
import { defineStore } from "pinia"

export const useBreadStore = defineStore("bread", () => {
  let tabList = ref([
    {
      path: "/",
      name: "home",
      label: "首页",
      icon: "house",
      url: "Home/Home",
    },
  ])

  const deleteMenu = (val) => {
    let it = tabList.value.findIndex((item) => item.name == val.name)
    if (it !== -1) {
      tabList.value.splice(it, 1)
    }
  }
  const selectMenu = (val) => {
    if (val.name !== "home") {
      let isHave = tabList.value.findIndex((item) => item.name == val.name)
      if (isHave === -1) {
        tabList.value.push(val)
      }
    }
  }
  return { tabList, selectMenu, deleteMenu }
})
