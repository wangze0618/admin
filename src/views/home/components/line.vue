<template>
  <div style="width: 100%" class="charts1" ref="charts1"></div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import * as echarts from "echarts"
let charts1 = ref()

const props = defineProps(["data"])
let darr = ref(props.data.date)
let sarr = ref(props.data.data)

let legend = Object.keys(sarr.value[0])
let newArr = []
let set = []
legend.forEach((i, t) => {
  let data = sarr.value.map((item) => item[i])
  set.push(data)
})

set.forEach((e, d) => {
  newArr.push({ data: set[d], type: "line" })
})

onMounted(() => {
  let ec1 = echarts.init(charts1.value)
  ec1.setOption({
    xAxis: {
      type: "category",
      data: props.data.date,
    },
    yAxis: {
      type: "value",
    },
    legend: {
      show: true,
    },
    series: newArr,
  })

  window.addEventListener("resize", () => {
    ec1.resize()
  })
})
</script>

<style scoped lang="scss"></style>
