import axios from "axios"
const instance = axios.create({
  timeout: 5000,
})

axios.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

type requestParams = {
  url: string
  method: string
  data?: any
}

export default (url: string, method: string, data?: any) => {
  return instance({
    url,
    method,
    [method.toLowerCase() == "get" ? "params" : "data"]: data,
  })
}
