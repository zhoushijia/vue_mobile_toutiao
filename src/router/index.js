import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    // 会直接去寻找login目录下的 index 所以可以省略
    component: () => import('@/views/login')
  },
  {
    path: '/',
    // name: 'layout', // 默认路径是home页面，所以这个name没啥意义
    // 会直接去寻找login目录下的 index 所以可以省略
    component: () => import('@/views/layout'),
    children: [
      {
        path: '',
        name: 'home',
        // 会直接去寻找login目录下的 index 所以可以省略
        component: () => import('@/views/home')
      },
      {
        path: '/qa',
        name: 'qa',
        // 会直接去寻找login目录下的 index 所以可以省略
        component: () => import('@/views/qa')
      },
      {
        path: '/video',
        name: 'video',
        // 会直接去寻找login目录下的 index/video 所以可以省略
        component: () => import('@/views/video')
      },
      {
        path: '/my',
        name: 'my',
        // 会直接去寻找login目录下的 index 所以可以省略
        component: () => import('@/views/my')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
