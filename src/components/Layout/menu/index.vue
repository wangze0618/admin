<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    text-color="#fff"
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    :collapse="asideStore.isCollapse"
  >
    <!-- title -->
    <h3 class="title">
      {{ asideStore.isCollapse ? "后台" : "通用后台管理系统" }}
    </h3>

    <template v-if="menuArr.length !== 0">
      <el-menu-item
        @click="goURL(item)"
        v-for="(item, index) in noChild"
        :index="item.name"
      >
        <el-icon>
          <component :is="item.icon" />
        </el-icon>
        <span>
          {{ item.label }}
        </span>
      </el-menu-item>

      <el-sub-menu v-for="(itm, ind) in hasChild" index="4">
        <template #title>
          <el-icon><Location /></el-icon>
          <span>
            {{ itm.label }}
          </span>
        </template>
        <el-menu-item
          @click="goURL(it)"
          v-for="it in itm.children"
          :index="it.name"
        >
          {{ it.label }}
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue"

import { getMenu } from "@/api/home"
import { useRoute, useRouter } from "vue-router"
import { useAsideStore } from "@/stores/aside"
import { useBreadStore } from "@/stores/bread"
import { useMenuStore } from "@/stores/menu"
const menuStore = useMenuStore()
const asideStore = useAsideStore()
const breadStore = useBreadStore()
const router = useRouter()
const route = useRoute()
let menuArr = ref([])
// 缺省值-是否折叠
let loading = ref(menuArr.value.length)
onMounted(async () => {
  // let { data: res } = await getMenu()

  menuArr.value = menuStore.menu
})
const goURL = (item) => {
  if (
    route.path !== item.path &&
    !(route.path === "/home" && item.path == "/")
  ) {
    breadStore.selectMenu(item)
    router.push(item.path)
  }
}
const hasChild = computed(() => {
  return menuArr.value.filter((item) => item.children)
})

const noChild = computed(() => {
  return menuArr.value.filter((item) => !item.children)
})
</script>

<style lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  height: 100%;
  border: none;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
  }
}
.title {
  margin: 0;
  line-height: 48px;
  height: 48px;
  font-weight: 400;
  font-size: 16px;
  text-align: center;
  color: #fff;
}
</style>
