import axios from 'axios'

// 以前是直接将基准路径挂载到 axios
// 现在采用 create 创建 axios 实例,这样可以保证多个axios实例,可以挂载多个基准路径
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

export default request
