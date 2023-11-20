// 用户信息模块的公共数据模块
import { getInfo, setInfo } from "@/utils/storage"
export default {
  namespaced: true,
  // 存储数据
  state() {
    return {
      // 即使获取的内容为空， 他也会帮我们创建一个新的空对象
      userInfo: getInfo()
    }
    
  },
  // 从state中筛选出符合条件的一些数据（必须要有返回值， 并且第一个参数必须是state）
  getters: {
  },
  
  // 对象中存放的是修改state的方法(所有的第一个参数必须是state, 然后才是形参)
  mutations: {
    setUserInfo(state, obj){
      state.userInfo = obj
      setInfo(obj)
    }

  },
  // actions负责进行异步操作， 一般需要调用mutation中的方法
  actions: {
    logout (context) {
      context.commit('setUserInfo', {})
      context.commit('cart/setCartList', [], { root: true })
    }
  },


}
