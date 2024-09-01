import { getSearchList } from "@/api/search";

const search = {
  state: {
    searchInfo: {
      attrsList: [], // 属性列表
      goodsList: [], // 商品列表
      trademarkList: [], // 品牌列表
    },
  },
  mutations: {
    setSearchList(state, data) {
      state.searchInfo = data;
    },
  },
  actions: {
    async getSearchList(context, params) {
      const res = await getSearchList(params);
      if (res.code === 200) {
        context.commit("setSearchList", res.data);
      }
    },
  },
  getters: {},
  namespaced: true,
};

export default search;
