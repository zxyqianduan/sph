import TypeNav from '@/components/TypeNav/index.vue'
import mySwiper from '@/components/Swiper/index.vue'
import VPagination from '@/components/Pagination/index.vue'

const components = [TypeNav, mySwiper,VPagination]

const plugins = {
  install (Vue) {
    components.forEach(item => {
      Vue.component(item.name, item)
    })
  }
}

export default plugins
