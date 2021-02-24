import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    // 会直接去寻找login目录下的 index 所以可以省略
    component: () => import('@/views/login')
  }
]

const router = new VueRouter({
  routes
})

export default router
