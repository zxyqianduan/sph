import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import loadingImg from '@/assets/images/ac8360bdc73343478db5bf582f04bdcc.gif'
import errorImg from '@/assets/images/1ae4efedc59642feb4fd37e5cb2126d9.gif'

Vue.use(VueLazyload, {
  preLoad: 1.3, // 加载图片之前预先加载的高度
  error: errorImg, // 加载失败后显示的图片
  loading: loadingImg, // 加载中的图片
  attempt: 1, // 尝试加载图片次数
  lazyComponent: true // 懒加载图片
})
