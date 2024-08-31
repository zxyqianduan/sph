import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'animate.css'
import plugins from '@/plugins/index'
import '@/Mock/index'

// 引入全局样式
import '@/assets/styles/reset.css'

// 引入全局组件
Vue.use(plugins)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
