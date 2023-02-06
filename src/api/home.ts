import request from "@/tools/request"
export const getMenu = () => {
  return request("/api/home/menu", "get")
}
export const getTable = () => {
  return request("/api/home/table", "get")
}
export const getCount = () => {
  return request("/api/home/count", "get")
}
export const getCharts = () => {
  return request("/api/home/charts", "get")
}
