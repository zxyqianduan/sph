import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home/index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/index.vue'),
    meta: {
      hidden: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register/index.vue'),
    meta: {
      hidden: true
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/Search/index.vue')
  }
]

const router = new VueRouter({
  routes
})

// 需要缓存修改的方法
const methdos = ['push', 'replace']

// 修改push和replace方法
methdos.forEach((item) => {
  const orgin = VueRouter.prototype[item] // 保存原始方法
  VueRouter.prototype[item] = function (path, successCb, errorCb) {
    if (successCb || errorCb) { // 如果有成功或失败回调函数
      return orgin.call(this, path, successCb, errorCb) // 调用原始方法并传入回调函数
    } else { // 没有回调函数
      return orgin.call(this, path, () => {}) // 调用原始方法并传入空函数作为回调函数
    }
  }
})

export default router
