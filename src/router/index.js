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
    path: '/user/profile',
    name: 'user-profile',
    component: () => import('@/views/user-profile')
  },
  {
    path: '/search',
    name: 'search',
    // 会直接去寻找login目录下的 index 所以可以省略
    component: () => import('@/views/search')
  },
  {
    // /article/:articleId? 表示还可以访问/article
    path: '/article/:articleId',
    name: 'article',
    // 会直接去寻找login目录下的 index 所以可以省略
    component: () => import('@/views/article'),
    // ! 解耦
    // 打开props传参
    props: true
  },
  {
    path: '/',
    // name: 'layout', // 默认路径是home页面，所以这个name没啥意义
    component: () => import('@/views/layout'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
