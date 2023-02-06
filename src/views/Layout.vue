<template>
  <div class="common-layout">
    <el-container>
      <!-- 侧边菜单 -->
      <el-aside class="aside">
        <Menu></Menu>
      </el-aside>
      <el-container>
        <!-- 头部 -->
        <el-header class="header"><Header></Header></el-header>
        <el-main style="padding-top: 0.6rem">
          <Tag></Tag>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import Menu from "@/components/Layout/menu/index.vue"
import Header from "@/components/Layout/header/header.vue"
import Tag from "@/components/Layout/tag/index.vue"
</script>

<style scoped lang="scss">
.common-layout {
  height: 100vh;
}
:deep(.header) {
  padding: 0;
  height: 70px;
}
:deep(.aside) {
  height: 100vh;
  width: auto !important;
}
</style>
