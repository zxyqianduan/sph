import { getToken, removeToken } from "@/utils/storage";
import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import { Message } from 'element-ui'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/Home/index.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login/index.vue"),
    meta: {
      hidden: true,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/Register/index.vue"),
    meta: {
      hidden: true,
    },
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("@/views/Search/index.vue"),
  },
  {
    path: "/detail/:skuId",
    name: "Detail",
    component: () => import("@/views/Detail/index.vue"),
  },
  {
    path: "/cart-success",
    name: "Cart-success",
    component: () => import("@/views/AddCartSuccess/index.vue"),
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("@/views/ShopCart/index.vue"),
  },
  {
    path: '/trade',
    name: 'Trade',
    component: () => import("@/views/Trade/index.vue"),
  },
  {
    path: '/pay',
    name: 'Pay',
    component: () => import("@/views/Pay/index.vue"),
  },
  {
    path: '/paySuccess',
    name: 'PaySuccess',
    component: () => import("@/views/PaySuccess/index.vue"),
  },
  {
    path: "/test",
    name: "Test",
    component: () => import("@/views/Test/test.vue"),
  },
];

const router = new VueRouter({
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});
const whiteList = ['/cart-success', '/cart','/pay','/paysuccess']

router.beforeEach(async (to, from, next) => {
  const token = getToken();
  if (token) {
    const userInfo = store.state.user.userInfo;
    if (userInfo && userInfo.id) {
      next();
    } else {
      try {
        await store.dispatch("user/getuserInfo");
        next();
      } catch (error) {
        console.log(error);
        Message.error('登录失效,请重新登录');
        removeToken();
        next("/login");
      }
    }
  } else if(!whiteList.includes(to.path)) {  
    next()
  }else {
    Message.error('未登录,请先登录')
    next("/login");
  }
});

// 需要缓存修改的方法
const methdos = ["push", "replace"];

// 修改push和replace方法
methdos.forEach((item) => {
  const orgin = VueRouter.prototype[item]; // 保存原始方法
  VueRouter.prototype[item] = function (path, successCb, errorCb) {
    if (successCb || errorCb) {
      // 如果有成功或失败回调函数
      return orgin.call(this, path, successCb, errorCb); // 调用原始方法并传入回调函数
    } else {
      // 没有回调函数
      return orgin.call(this, path, () => {}); // 调用原始方法并传入空函数作为回调函数
    }
  };
});

export default router;
