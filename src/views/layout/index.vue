<template>
  <div>
    <router-view></router-view>
    <!-- 二级路由出口 -->
    <!-- <van-icon name="cart" /> -->
    <van-tabbar route active-color="#ee0a24" inactive-color="#000">
      <van-tabbar-item to="/home" icon="wap-home">首页</van-tabbar-item>
      <van-tabbar-item to="/category" icon="more">分类页</van-tabbar-item>
      <van-tabbar-item to="/cart" icon="shopping-cart">购物车</van-tabbar-item>
      <van-tabbar-item to="/user" icon="contact">我的</van-tabbar-item>                      
    </van-tabbar>
  </div>
</template>

<script>
  export default{ 
    name: 'LayoutIndex'
  }
 
</script>

<style>



</style>