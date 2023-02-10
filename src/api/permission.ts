import request from "@/tools/request"

export const getMenu = (data) => {
  return request("/api/permission/getmenu", "post", data)
}
