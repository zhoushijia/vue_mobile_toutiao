import Vue from 'vue'
import Vuex from 'vuex'
import { setToken, getToken } from '@/utils/storage'

Vue.use(Vuex)
const USER_TOKEN = 'TOUTIAO_USER'
export default new Vuex.Store({
  state: {
    // 刷新页面则重新获取 user token
    user: getToken(USER_TOKEN),
    aliveCom: ['LayoutIndex']
  },
  mutations: {
    setUser(state, user) {
      // Vuex中保存token信息 实现响应式，便捷
      state.user = user
      // 本地存储，实现持久化  防止刷新造成数据丢失
      setToken(USER_TOKEN, JSON.stringify(user))
    },
    // 登录时移除LayoutIndex组件缓存
    removeLayoutIndex(state, com) {
      const i = state.aliveCom.indexOf(com)
      if (i !== -1) state.aliveCom.splice(i, 1)
    },
    // 渲染时添加LayoutIndex缓存
    addLayoutIndex(state, com) {
      const i = state.aliveCom.indexOf(com)
      if (i === -1) state.aliveCom.push(com)
    }
  },
  actions: {},
  modules: {}
})
