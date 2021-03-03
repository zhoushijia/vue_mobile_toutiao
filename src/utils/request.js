import axios from 'axios'
import store from '@/store'
import jsonBig from 'json-bigint'

// 以前是直接将基准路径挂载到 axios
// 现在采用 create 创建 axios 实例,这样可以保证多个axios实例,可以挂载多个基准路径
const request = axios.create({
  // baseURL: 'http://ttapi.research.itcast.cn/'  //接口有问题 改 vue.config.js
  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [
    function(data) {
      // 对 data 进行任意转换处理
      try {
        return jsonBig.parse(data)
      } catch (err) {
        // 如果转换失败，则包装为统一数据格式并返回
        return { data }
      }
    }
  ]
})

// 设置请求拦截器
request.interceptors.request.use(
  function(config) {
    if (store.state.user && store.state.user.token) {
      config.headers.Authorization = `Bearer ${store.state.user.token}`
    }
    return config
  },
  // 如果请求出错了，请求未发出（会走这里）
  function(err) {
    return Promise.reject(err)
  }
)

export default request
