import axios from 'axios'
import store from '@/store'

// 以前是直接将基准路径挂载到 axios
// 现在采用 create 创建 axios 实例,这样可以保证多个axios实例,可以挂载多个基准路径
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
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
