import Vue from 'vue'
import Vuex from 'vuex'
import { setToken, getToken } from '@/utils/storage'

Vue.use(Vuex)
const USER_TOKEN = 'TOUTIAO_USER'
export default new Vuex.Store({
  state: {
    // 刷新页面则重新获取 user token
    user: getToken(USER_TOKEN)
  },
  mutations: {
    setUser(state, user) {
      // Vuex中保存token信息 实现响应式，便捷
      state.user = user
      // 本地存储，实现持久化  防止刷新造成数据丢失
      setToken(USER_TOKEN, JSON.stringify(user))
    }
  },
  actions: {},
  modules: {}
})
