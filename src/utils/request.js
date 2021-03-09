import axios from 'axios'
import store from '@/store'
import jsonBig from 'json-bigint'
import { Toast } from 'vant'
import router from '@/router'

let baseURL = '/app'
if (process.env.NODE_ENV === 'production') {
  baseURL = 'http://toutiao-app.itheima.net/'
  // baseURL = 'http://ttapi.research.itcast.cn/'
}
// 以前是直接将基准路径挂载到 axios
// 现在采用 create 创建 axios 实例,这样可以保证多个axios实例,可以挂载多个基准路径
const request = axios.create({
  // baseURL: 'http://ttapi.research.itcast.cn/'  //接口有问题 改 vue.config.js
  baseURL,
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
const requestToken = axios.create()

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

export const login = () =>
  // ! 登陆后返回前一个页面
  router.replace({
    name: 'login',
    // router.currentRoute 就相当于你组件当中使用的 this.$router
    query: { redirect: router.currentRoute.fullPath }
  })

// 响应拦截器
request.interceptors.response.use(
  function(response) {
    return response
  },
  async function(err) {
    // ! 请求错误优化
    const st = err.response.status
    const user = store.state.user
    if (st === 400) {
      Toast.fail('请求参数错误')
    } else if (st === 401) {
      // ! token刷新
      try {
        // #1 如果token无效 判断是否有user或user.refresh_token
        if (!user || !user.refresh_token) {
          login()
        } else {
          // #2 如果有refresh_token 通过refresh_token发请求更新token
          // ! 这里不建议用 request 去调用了，万一用 request 调用再出现了 401，就会形成死循环，解决办法就是封装一个新的请求函数
          const {
            data: {
              data: { token }
            }
          } = await requestToken({
            method: 'PUT',
            url: '/v1_0/authorizations',
            headers: { Authorization: `Bearer ${user.refresh_token}` }
          })
          // #3 将新的token赋值给vuex中的user
          user.token = token
          store.commit('setUser', user)
          // console.log(store.state.user)
          // #4 重新发请求
          // err中的config携带了上次请求的所有请求信息
          // 再次发起的请求头依然会经过请求拦截器，此时token已经更新为最新的token
          // console.dir(err)
          return await request(err.config)
        }
      } catch (error) {
        err = error
        login()
      }
      // Toast.fail('无效 TOKEN')
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
