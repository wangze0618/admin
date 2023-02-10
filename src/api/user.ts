import request from "@/tools/request"

// 创建用户
export const createUser = (data: object) => {
  return request("/api/user/add", "post", data)
}
// 更新用户
export const updateUser = (data: object) => {
  return request("/api/user/edit", "post", data)
}
// 删除用户
export const deleteUser = (data: object) => {
  return request("/api/user/del", "post", data)
}
// 获取用户列表
export const getUserList = (data) => {
  return request("/api/user/userlist", "get", data)
}
