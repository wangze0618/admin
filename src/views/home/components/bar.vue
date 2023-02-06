<template>
  <div style="width: 100%" class="charts2" ref="charts2"></div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import * as echarts from "echarts"
let charts2 = ref()
const props = defineProps(["data"])
let set = ref(props.data)

let legend = []
let newArr = []
let activeArr = []
set.value.forEach((t, ind) => {
  legend.push(t["date"])
  newArr.push(t["new"])
  activeArr.push(t["active"])
})
onMounted(() => {
  let ec2 = echarts.init(charts2.value)
  ec2.setOption({
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    xAxis: {
      type: "category",
      data: legend,
    },
    yAxis: {
      type: "value",
    },
    legend: {
      show: true,
    },
    series: [
      {
        name: "新用户",
        type: "bar",
        data: newArr,
        color: "#24aabf",
      },
      {
        name: "有效用户",
        type: "bar",
        data: activeArr,
        color: "#b8a7df",
      },
    ],
  })

  window.addEventListener("resize", () => {
    ec2.resize()
  })
})
</script>

<style scoped lang="scss"></style>
