import Mock from "mockjs"
import { getCount } from "./modules/home/count"
import { getMenu } from "./modules/home/menu"
import { getTable } from "./modules/home/table"
import { getCharts } from "./modules/home/charts"
Mock.setup({
  timeout: "400-600",
})

// 获取左侧菜单数据
Mock.mock(/\api\/home\/menu/, "get", getMenu)

// 获取table数据
Mock.mock(/\api\/home\/table/, "get", getTable)

// count数据
Mock.mock(/\api\/home\/count/, "get", getCount)

// charts数据
Mock.mock(/\api\/home\/charts/, "get", getCharts)
