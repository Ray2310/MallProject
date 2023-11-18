
<template>
  <div class="cart">
    <van-nav-bar title="购物车" fixed />
      <!-- 使用一个大盒子来封装处理， 如果未登录则显示不同的页面 -->
      <div v-if="isLogin && cartList.length > 0">
        <!-- 购物车开头 -->
        <div class="cart-title">
          <span class="all">共<i>{{ selectCount }}</i>件商品</span>
          <!-- 取反 -->
          <span class="edit" @click="isEdit = !isEdit">
            <van-icon name="edit" />
            编辑
          </span>
        </div>

        <!-- 购物车列表 -->
        <div class="cart-list">
          <div class="cart-item" v-for="item in cartList" :key="item.goods_id">
            <van-checkbox :value="item.isChecked" @click="selectOne(item.goods_id)"></van-checkbox>
            <div class="show">
              <img :src="item.goods.goods_image" alt="">
            </div>
            <div class="info">
              <span class="tit text-ellipsis-2">{{ item.goods.goods_name }}</span>
              <span class="bottom">
                <div class="price">¥ <span>{{ item.goods.goods_price_min }}</span></div>
                <!-- 使用子组件来完成对应的功能 
                通过监听input得到用户输入的值
                即希望保留原本的形参， 但是又需要通过调用函数传递参数 === 这里就可以用到箭头函数
                -->
                <CountBox @input="(value) => changeCount(value,item.goods_id,item.goods_sku_id)" :value="item.goods_num"></CountBox>
              </span>
            </div>
          </div>
        </div>
        
        <div class="footer-fixed">
          <div  class="all-check">
            <van-checkbox  icon-size="18" :value="isAllChecked" @click="selectAll()"></van-checkbox>
            全选
          </div>

          <div class="all-total">
            <div class="price">
              <span>合计：</span>
              <span>¥ <i class="totalPrice">{{ selectCartPrice }}</i></span>
            </div>
            <!-- :class="{ disabled: selectCount === 0 }" 作用是如果商品数量 <= 0那么结算就不能高亮显示 -->
            <div v-if="!isEdit" class="goPay" :class="{ disabled: selectCount === 0 }">结算({{ selectCount }})</div>
            <div v-else :class="{ disabled: selectCount === 0 }" @click="handleDel" class="delete">
              删除({{ selectCount }})
            </div>
          </div>
        </div>
      </div>
      <!-- 如果未登录 或者 购物车为空， 那么就给一个其他的样式 -->
      <div v-else>

        <div class="cart-box" v-if="isLogin && cartList.length > 0">
          <!-- 购物车开头 -->
          <div class="cart-title">
            ...
          </div>
          <!-- 购物车列表 -->
          <div class="cart-list">
            ...
          </div>
          <div class="footer-fixed">
            ...
          </div>
        </div>
        
        <div class="empty-cart" v-else>
          <img src="@/assets/empty.png" alt="">
          <div class="tips">
            您的购物车是空的, 快去逛逛吧
          </div>
          <div class="btn" @click="$router.push('/')">去逛逛</div>
        </div>
      </div>
  </div>
</template>

<script>
import CountBox from '@/components/CountBox.vue'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'CartIndex',
  //  将vuex模块中存储的数据映射到页面
  data() {
    return { 
      isEdit: false
    }
  },
  computed: {
    ...mapState('cart', ['cartList']),
    ...mapGetters('cart', ['cartTotal','selectCartList','selectCount','selectCartPrice','isAllChecked', ]), 
    isLogin() { 
      return this.$store.getters.token
    }
  },
  components: {
    CountBox,
  },
  methods: { 
    selectAll() { 
      this.$store.commit('cart/changeCheckedAll')
    },
    // 点击复选框 是否选中
    selectOne(goodsId) { 
      this.$store.commit('cart/changeChecked',goodsId)
    },

    // 监听商品数量的变化
    changeCount(goodsNum, goodsId, goodsSkuId) { 
      // 调用vuex的action进行修改数量
      this.$store.dispatch('cart/changeCountAction', {
          goodsNum,
          goodsId,
          goodsSkuId
        })
    },
    async handleDel() {
      if (this.selCount === 0) return
      await this.$store.dispatch('cart/delSelect')
      this.isEdit = false
    }

  },

  created() { 
    // 获取购物车列表
    //需要用户登录
    if(this.$store.getters.token){
      // 触发调用getCartAction 动作
      this.$store.dispatch('cart/getCartAction')
    }
  }
}
</script>

<style lang="less" scoped>
.empty-cart {
  padding: 80px 30px;
  img {
    width: 140px;
    height: 92px;
    display: block;
    margin: 0 auto;
  }
  .tips {
    text-align: center;
    color: #666;
    margin: 30px;
  }
  .btn {
    width: 110px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    background-color: #fa2c20;
    border-radius: 16px;
    color: #fff;
    display: block;
    margin: 0 auto;
  }
}
// 主题 padding
.cart {
  padding-top: 46px;
  padding-bottom: 100px;
  background-color: #f5f5f5;
  min-height: 100vh;
  .cart-title {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    font-size: 14px;
    .all {
      i {
        font-style: normal;
        margin: 0 2px;
        color: #fa2209;
        font-size: 16px;
      }
    }
    .edit {
      .van-icon {
        font-size: 18px;
      }
    }
  }

  .cart-item {
    margin: 0 10px 10px 10px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
    border-radius: 5px;

    .show img {
      width: 100px;
      height: 100px;
    }
    .info {
      width: 210px;
      padding: 10px 5px;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .bottom {
        display: flex;
        justify-content: space-between;
        .price {
          display: flex;
          align-items: flex-end;
          color: #fa2209;
          font-size: 12px;
          span {
            font-size: 16px;
          }
        }
        .count-box {
          display: flex;
          width: 110px;
          .add,
          .minus {
            width: 30px;
            height: 30px;
            outline: none;
            border: none;
          }
          .inp {
            width: 40px;
            height: 30px;
            outline: none;
            border: none;
            background-color: #efefef;
            text-align: center;
            margin: 0 5px;
          }
        }
      }
    }
  }
}

.footer-fixed {
  position: fixed;
  left: 0;
  bottom: 50px;
  height: 50px;
  width: 100%;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;

  .all-check {
    display: flex;
    align-items: center;
    .van-checkbox {
      margin-right: 5px;
    }
  }

  .all-total {
    display: flex;
    line-height: 36px;
    .price {
      font-size: 14px;
      margin-right: 10px;
      .totalPrice {
        color: #fa2209;
        font-size: 18px;
        font-style: normal;
      }
    }

    .goPay, .delete {
      min-width: 100px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      background-color: #fa2f21;
      color: #fff;
      border-radius: 18px;
      &.disabled {
        background-color: #ff9779;
      }
    }
  }

}
</style>