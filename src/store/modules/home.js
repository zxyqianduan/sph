import { reqCategoryList } from '@/api/Home'

const home = {
  namespaced: true,
  state: {
    CategoryList: [] // 三级分类
  },
  mutations: {
    setCategoryList (state, params) {
      state.CategoryList = params.slice(0, 15)
    }
  },
  actions: {
    async getCategory (context) {
      const res = await reqCategoryList()
      if (res.code === 200) {
        context.commit('setCategoryList', res.data)
      }
    }
  },
  getters: {}

}

export default home
