import { changeCount, getCartList , delSelectShop} from "@/api/cart"
import { Toast } from "vant"

export default {
  namespaced: true,
  state(){  
    return {
      // 购物车列表
      cartList: [],

    }
  },
  //封装 getters：商品总数  / 选中的商品列表  /   选中的商品总数  /   选中的商品总价
  getters: { 
    // 商品累加总数
    cartTotal(state) {
      return state.cartList.reduce((sum, item, index) => sum + item.goods_num, 0)
    },
    // 选中的商品列表
    selectCartList(state) { 
      return state.cartList.filter((item)=> item.isChecked === true)
    },
    // 选中的商品总数
    selectCount (state, getters) {
      return getters.selectCartList.reduce((sum, item, index) => sum + item.goods_num, 0)

    },
    // 选中的商品总价
    selectCartPrice(state, getters) { 
      return getters.selectCartList.reduce((sum, item, index) => sum + item.goods_num * item.goods.goods_price_min, 0)
    },
    // 是否全选
    isAllChecked(state) { 
      return state.cartList.every(item => item.isChecked === true)
    }  ,
  
    
  },

  mutations: { 
    // 提供一个设置cartList的mutation
    setCartList(state, newList){
      state.cartList = newList
    },
    changeChecked(state, goodsId,getters) { 
      // 让对应的id的项 取反
      const goods = state.cartList.find((item) => item.goods_id === goodsId )
      goods.isChecked = !goods.isChecked
      // 如果检查所有的isChecked都是true， 那么就需要将下面的全选框点击上.我们通过getters来进行补充
    },
    changeCheckedAll(state) { 
      state.cartList.forEach(element => {
        element.isChecked = !element.isChecked
      });
    },
    // 本地修改数量
    changeCount(state,{ goodsId, goodsNum }) { 
      const goods = state.cartList.find((item) => item.goods_id === goodsId )
      goods.goods_num = goodsNum
    }

  },
  // 处理异步请求
  actions: { 
    async getCartAction(context) {
       const { data }  = await getCartList()
        // 后台返回的数据中， 不包括复选框的选中状态， 为了实现将来的功能，需要手动维护， 给每个项添加一个isChecked状态 
        data.list.forEach(element => {
            element.isChecked = true
        });
        // 调用mutations来进行设置cartList
       context.commit('setCartList', data.list)
      },
      // 改变用户输入的商品数量
      async changeCountAction(context, obj) { 
        const { goodsNum ,goodsId, goodsSkuId } = obj
        // 先本地修改， 然后再同步到后台
        context.commit('changeCount', {goodsId, goodsNum })
        //同步到后台
        // const res = await changeCount(goodsNum, goodsId, goodsSkuId)
        // console.log(res)
      },

      // 删除购物车数据
      async delSelect (context) {
        const selCartList = context.getters.selectCartList
        const cartIds = selCartList.map(item => item.id)
        await delSelectShop(cartIds)
        Toast("删除成功")

        // 重新拉取最新的购物车数据 (重新渲染)
        context.dispatch('getCartAction')
      }

  }

  



}