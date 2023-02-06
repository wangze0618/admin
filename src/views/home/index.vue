<template>
  <div class="container" v-if="listData?.length">
    <el-row>
      <el-col :span="8" class="">
        <div class="left">
          <el-card class="mb-4" shadow="hover">
            <div class="top">
              <img src="@/assets/images/user.png" alt="" />
              <div class="user-info ml-5">
                <h1>Admin</h1>
                <span>超级管理员</span>
              </div>
            </div>
            <el-divider />
            <div class="bottom">
              <p>上次登录时间：123</p>
              <p class="mb-0">上次登录地点：123</p>
            </div>
          </el-card>
          <el-card shadow="hover" class="card-table">
            <el-table :data="listData" style="width: 100%">
              <el-table-column prop="name" label="课程" />
              <el-table-column prop="todayBuy" label="今日购买" />
              <el-table-column prop="monthBuy" label="本月购买" />
              <el-table-column prop="totalBuy" label="总购买" />
            </el-table>
          </el-card>
        </div>
      </el-col>
      <el-col :span="16" class="pl-4">
        <div class="right">
          <el-card class="right-card mb-3" v-for="(item, index) in countData">
            <el-icon class="icon" :style="`background-color:${item.color}`">
              <component
                style="width: 30px; height: 30px; color: #fff"
                :is="item.icon"
              />
            </el-icon>
            <div class="right-info ml-3">
              <p class="m-0">￥{{ item.value }}</p>
              <p class="m-0">{{ item.name }}</p>
            </div>
          </el-card>
        </div>
        <div class="f1">
          <el-card style="height: 280px"
            ><Line :data="chartsData.orderData" style="height: 280px"></Line
          ></el-card>
        </div>

        <div class="bottom mt-3">
          <el-row>
            <el-col :span="12">
              <el-card style="height: 280px">
                <Bar
                  :data="chartsData.userData"
                  style="height: 260px; width: 100%"
                ></Bar>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card style="height: 280px" class="ml-4">
                <Pie
                  :data="chartsData.videoData"
                  style="height: 260px; width: 100%"
                ></Pie>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { getTable, getCount, getCharts } from "@/api/home"
import Line from "@/views/home/components/line.vue"
import Bar from "./components/bar.vue"
import Pie from "./components/pie.vue"
let listData = ref<[]>()
let countData = ref<[]>()
let chartsData = ref<[]>()
onMounted(async () => {
  let { data: data2 } = await getCount()
  let { data: data3 } = await getCharts()
  listData.value = data3.data.tableData
  countData.value = data2.data
  chartsData.value = data3.data
})
</script>

<style scoped lang="scss">
.container {
  .bottom {
    // display: flex;
    // .el-card {
    //   flex: 1;
    // }
  }
  height: 100%;
  .el-row {
    height: 100%;
    .el-col {
      height: 100%;
    }
  }
  .left {
    .card-table {
      height: 500px;
    }
    .bottom {
      color: #999;
      p {
        font-size: 14px;
      }
    }
    .top {
      display: flex;
      align-items: center;
      width: 100%;

      .user-info {
        // text-align: center;
        flex: 1;
        h1 {
          margin: 0 0 0.25em 0;
          font-weight: normal;
        }
        span {
          color: #999;
        }
      }
      img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
      }
    }
  }
  .right {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .right-info {
      p {
        &:nth-child(1) {
          font-size: 26px;
          font-weight: bold;
          margin-bottom: 0.4rem;
        }
        &:nth-child(2) {
          font-size: 14px;
          color: #999;
        }
      }
    }
    .right-card {
      flex-grow: 1;
      flex-basis: 30%;
      margin-right: 0.8em;
      &:nth-child(3n) {
        margin-right: 0;
      }
      .icon {
        height: 78px;
        width: 78px;
        background-color: red;
      }
      :deep(.el-card__body) {
        display: flex;
        align-items: center;
        padding: 0;
      }
    }
  }
}
</style>
