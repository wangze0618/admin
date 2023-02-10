<template>
  <header class="header">
    <div class="left-con">
      <el-button :icon="Menu" size="small" @click="changeCollapse()" />
      <!-- 面包屑 -->
      <div class="bread-con">
        <el-breadcrumb class="bread" separator="/">
          <el-breadcrumb-item
            class="bread-item"
            v-for="(item, index) in breadItem"
            :to="{ path: item.path }"
            >{{ item.label }}</el-breadcrumb-item
          >
        </el-breadcrumb>
      </div>
    </div>
    <div class="right-con">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img src="@/assets/images/user.png" alt="" />
        </span>
        <template #dropdown>
          <el-dropdown-menu class="menu">
            <el-dropdown-item class="menu-item">个人中心</el-dropdown-item>
            <el-dropdown-item @click="logout" class="menu-item"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue"
import { Menu } from "@element-plus/icons-vue"
import { useAsideStore } from "@/stores/aside"
import { useBreadStore } from "@/stores/bread"
import { useMenuStore } from "@/stores/menu"
import Cookie from "js-cookie"
import { useRouter } from "vue-router"

const asideStore = useAsideStore()
const breadStore = useBreadStore()
const menuStore = useMenuStore()
const router = useRouter()
let breadItem = ref([])
watch(
  () => breadStore.tabList,
  (val) => {
    breadItem.value = val
  },
  {
    immediate: true,
    deep: true,
  }
)
const changeCollapse = () => {
  asideStore.toggleCollapse()
}

const logout = () => {
  // 清楚cookie 的token
  Cookie.remove("token")
  menuStore.clearMenu()
  router.push("/login")
}
</script>

<style scoped lang="scss">
.bread {
  :deep(.el-breadcrumb__inner) {
    font-weight: normal;
    // :deep(.is)
    color: #666 !important;
  }
  :deep(.el-breadcrumb__item) {
    &:nth-child(3) {
      span {
        color: #fff !important;
      }
    }
  }
}
.header {
  width: 100%;
  background-color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
  .left-con {
    margin-left: 1.6rem;
    .bread-con {
      display: inline-block;
      color: #fff;
      margin-left: 0.8rem;
    }
  }
  .right-con {
    .menu {
      .menu-item {
        :deep(span) {
          user-select: none;
        }
      }
    }
    margin-right: 1.6rem;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
    }
  }
}
</style>
