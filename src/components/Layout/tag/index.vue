<template>
  <div class="tabs">
    <el-tag
      v-for="(item, index) in breadItem"
      class="mb-2 mr-2"
      :closable="item.closeable"
      size="large"
      :effect="route.name == item.name ? 'dark' : 'light'"
      @click="goTag(item)"
      @close="closeTag(item, index)"
    >
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from "vue"
import { useBreadStore } from "@/stores/bread"
import { useRouter, useRoute } from "vue-router"
import { ElMessage, ElMessageBox } from "element-plus"
const router = useRouter()
const route = useRoute()
console.log(route)
const breadStore = useBreadStore()
const goTag = (d) => {
  router.push(d.path)
}
const closeTag = async (d, i) => {
  const length = breadStore.tabList.length - 1
  try {
    await ElMessageBox.confirm("确认删除此标签?", "确认删除？", {
      confirmButtonText: "删除",
      cancelButtonText: "取消",
      type: "warning",
    })
    breadStore.deleteMenu(d)

    if (i == length) {
      router.push({
        name: breadStore.tabList[i - 1].name,
      })
    } else {
      router.push({
        name: breadStore.tabList[i].name,
      })
    }

    ElMessage({
      type: "success",
      message: "删除成功！",
    })
  } catch (error) {
    console.log(error)
    ElMessage({
      type: "info",
      message: "取消删除！",
    })
  }
}
let breadItem = ref([])
watch(
  () => breadStore.tabList,
  (val) => {
    breadItem.value = val
    breadItem.value.forEach((it) => {
      if (it.name == "home") {
        it.closeable = false
      } else {
        it.closeable = true
      }
    })
  },
  {
    immediate: true,
    deep: true,
  }
)
</script>
<style lang="scss" scoped></style>
