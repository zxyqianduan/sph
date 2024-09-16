import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'animate.css'
import plugins from '@/plugins/index'
import '@/Mock/index'
import '@/plugins/Element'
import './plugins/validate.js'
// import 'lazysizes'
// import 'lazysizes/plugins/parent-fit/ls.parent-fit'
import '@/plugins/lazyload.js'
// 引入全局样式
import '@/assets/styles/reset.css'

// 引入全局组件
Vue.use(plugins)

Vue.config.productionTip = false

new Vue({
  beforeCreate () {
    Vue.prototype.$eventBus = this
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
