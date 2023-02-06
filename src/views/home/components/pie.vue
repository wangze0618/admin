<template>
  <div style="width: 100%" class="charts3" ref="charts3"></div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import * as echarts from "echarts"
let charts3 = ref()
const props = defineProps(["data"])

onMounted(() => {
  let ec3 = echarts.init(charts3.value)
  ec3.setOption({
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        type: "pie",
        data: props.data,
      },
    ],
  })

  window.addEventListener("resize", () => {
    ec3.resize()
  })
})
</script>

<style scoped lang="scss"></style>
