import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入全局样式
import './styles/index.less'
// 引入vant核心组件库
import Vant from 'vant'
// 引入vant样式
import 'vant/lib/index.css'
// 引入rem适配
import 'amfe-flexible'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
