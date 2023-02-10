import Mock from "mockjs"
import { getCount } from "./modules/home/count"
import { getMenu } from "./modules/home/menu"
import { getTable } from "./modules/home/table"
import { getCharts } from "./modules/home/charts"
import {
  createUser,
  deleteUser,
  updateUser,
  getUserList,
} from "./modules/user/user"
import permission from "./modules/permission/index"
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

// 用户列表数据
Mock.mock(/\api\/user\/add/, "post", createUser)
Mock.mock(/\api\/user\/edit/, "post", updateUser)
Mock.mock(/\api\/user\/del/, "post", deleteUser)
Mock.mock(/\api\/user\/userlist/, "get", getUserList)

// 登录接口
Mock.mock(/\api\/permission\/getmenu/, "post", permission.getMenu)
