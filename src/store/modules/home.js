import { getfloorData, getSwiperData, reqCategoryList } from '@/api/Home'

const home = {
  namespaced: true,
  state: {
    CategoryList: [], // 三级分类
    SwiperList: [], // 轮播图
    floorData: [] // 楼层数据
  },
  mutations: {
    setCategoryList (state, params) {
      state.CategoryList = params.slice(0, 15)
    },
    setSwiperList (state, params) {
      state.SwiperList = params
    },
    setFloorData (state, params) {
      state.floorData = params
    }
  },
  actions: {
    // 获取三级分类数据
    async getCategory (context) {
      const res = await reqCategoryList()
      if (res.code === 200) {
        context.commit('setCategoryList', res.data)
      }
    },
    // 获取轮播图数据
    async getSwiper (context) {
      const res = await getSwiperData()
      context.commit('setSwiperList', res)
    },
    // 获取楼层数据
    async getFloorData (context) {
      const res = await getfloorData()
      context.commit('setFloorData', res)
    }
  },
  getters: {}

}

export default home
