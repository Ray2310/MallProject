import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import cart from './modules/cart'
Vue.use(Vuex)

export default new Vuex.Store({

  getters: {
    // 配置getters 直接获取token
    token(state){
      return state.user.userInfo.token
    }
  },
  mutations: {
  },
  actions: {
  },
  // 挂载模块
  modules: {
    user,
    cart,

  }
})
