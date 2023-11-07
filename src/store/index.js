import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
Vue.use(Vuex)

export default new Vuex.Store({

  state: {
  },
  getters: {
    // 配置getters 直接获取token
    getToken(state){
      return state.user.userInfo.token
    }
  },
  mutations: {
  },
  actions: {
  },
  // 挂载模块
  modules: {
    user
  }
})
