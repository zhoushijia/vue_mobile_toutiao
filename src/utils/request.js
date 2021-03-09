import axios from 'axios'
import store from '@/store'
import jsonBig from 'json-bigint'
import { Toast } from 'vant'

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

// ! 新的基准请求对象 专门用于更新token 防止出现死循环
// const requestToken = axios.create()

// 设置请求拦截器
request.interceptors.request.use(
  function(config) {
    const user = store.state.user
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  // 如果请求出错了，请求未发出（会走这里）
  function(err) {
    return Promise.reject(err)
  }
)

// 响应拦截器
request.interceptors.response.use(
  function(config) {
    return config
  },
  function(err) {
    // ! 请求错误优化
    const st = err.response.status
    if (st === 400) {
      Toast.fail('请求参数错误')
    } else if (st === 401) {
      Toast.fail('无效 TOKEN')
    } else if (st === 403) {
      Toast.fail('无权限')
    } else if (st === 404) {
      Toast.fail('资源不存在')
    } else if (st === 405) {
      Toast.fail('请求方法错误')
    } else if (st >= 500) {
      Toast.fail('服务器错误')
    }
    return Promise.reject(err)
  }
)
export default request
