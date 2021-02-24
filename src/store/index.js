import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const USER_TOKEN = 'TOUTIAO_USER'
export default new Vuex.Store({
  state: {
    // 刷新页面则重新获取 user token
    user: JSON.parse(window.localStorage.getItem(USER_TOKEN))
  },
  mutations: {
    setUser(state, user) {
      // Vuex中保存token信息 实现响应式，便捷
      state.user = user
      // 本地存储，实现持久化  防止刷新造成数据丢失
      window.localStorage.setItem(USER_TOKEN, JSON.stringify(user))
    }
  },
  actions: {},
  modules: {}
})
