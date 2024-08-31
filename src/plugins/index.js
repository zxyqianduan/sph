import TypeNav from '@/components/TypeNav/index.vue'
import mySwiper from '@/components/Swiper/index.vue'
const components = [TypeNav, mySwiper]

const plugins = {
  install (Vue) {
    components.forEach(item => {
      Vue.component(item.name, item)
    })
  }
}

export default plugins
