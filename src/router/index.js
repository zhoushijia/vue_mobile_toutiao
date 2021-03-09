import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import { Dialog } from 'vant'
import { login } from '@/utils/request'

Vue.use(VueRouter)

// 解决报错
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
// push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch(err => err)
}
// replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalReplace.call(this, location, onResolve, onReject)
  }
  return originalReplace.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/login',
    name: 'login',
    // 会直接去寻找login目录下的 index 所以可以省略
    component: () => import('@/views/login'),
    meta: { requiresAuth: false }
  },
  {
    path: '/user/profile',
    name: 'user-profile',
    component: () => import('@/views/user-profile'),
    meta: { requiresAuth: true }
  },
  {
    path: '/search',
    name: 'search',
    // 会直接去寻找login目录下的 index 所以可以省略
    component: () => import('@/views/search'),
    meta: { requiresAuth: false }
  },
  {
    // /article/:articleId? 表示还可以访问/article
    path: '/article/:articleId',
    name: 'article',
    // 会直接去寻找login目录下的 index 所以可以省略
    component: () => import('@/views/article'),
    // ! 解耦
    // 打开props传参
    props: true,
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    // name: 'layout', // 默认路径是home页面，所以这个name没啥意义
    component: () => import('@/views/layout'),
    meta: { requiresAuth: false },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home'),
        meta: { requiresAuth: false }
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa'),
        meta: { requiresAuth: true }
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video'),
        meta: { requiresAuth: true }
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my'),
        meta: { requiresAuth: false }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 路由守卫
router.beforeEach(async (to, from, next) => {
  // ! meta.requiresAuth是否需要登录权限
  if (to.meta.requiresAuth) {
    // 判断是否已登录
    // 已经登陆
    if (store.state.user) return next()
    // 未登录
    const r = await Dialog.confirm({
      title: '提示',
      message: '是否去登录？'
    }).catch(e => e)
    if (r === 'confirm') {
      login()
    } else {
      next(false)
    }
  } else {
    next()
  }
})

export default router
