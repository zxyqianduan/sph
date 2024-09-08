import { Loginout, userInfo } from "@/api/login-register";
import { removeToken, saveToken } from "@/utils/storage";

const user = {
  state: {
    userInfo: "", // 用户信息
  },
  mutations: {
    // 存储用户信息
    setUserInfo(state, params) {
      state.userInfo = params;
    },
  },
  actions: {
    // 获取用户信息
   async getuserInfo(context){
     const res = await userInfo()
     if(res.code === 200){
      context.commit('setUserInfo',res.data)
      localStorage.setItem('userInfo',JSON.stringify(res.data))
     }else{
      return Promise.reject(new Error())
     }
    },

    // 退出登录
    async loginOut(context){
     const res = await Loginout()
     if(res.code === 200){
      removeToken()
      context.commit('setUserInfo','')
      return 'ok'
     }
    }
  },
  getters: {},
  namespaced: true,
};

export default user;
