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
  persist: {
    storage: localStorage,
  },
})
