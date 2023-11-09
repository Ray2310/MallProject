<template>
  <div class="search">
    <van-nav-bar fixed title="商品列表" left-arrow @click-left="$router.go(-1)" />

    <van-search
      readonly
      shape="round"
      background="#ffffff"
      :value="querySearch || '搜索商品'"
      show-action
      @click="$router.push('/search')"
    >
      <template #action>
        <van-icon class="tool" name="apps-o" />
      </template>
    </van-search>

    <!-- 排序选项按钮 -->
    <div class="sort-btns">
      <div class="sort-item">综合</div>
      <div class="sort-item">销量</div>
      <div class="sort-item">价格 </div>
    </div>

    <div class="goods-list">
      <GoodsItem v-for="item in proList" :key="item.goods_id" :item="item"></GoodsItem>
    </div>
  </div>
</template>

<script>
import { getProList } from '@/api/product'
import GoodsItem from '@/components/GoodsItem.vue'
export default {
  name: 'SearchIndex',
  components: {
    GoodsItem
  },
  data() {
    return {
      page: 1, // 默认设置为1页
      proList: [],  // 存储获取对应search的value得到的商品列表
    }
  },
  computed: {
    // 获取搜索栏的搜索关键字
    querySearch(){
  //在 Vue.js 中，this.$route 是当前路由对象，query 是该对象的一个属性，用于获取查询参数。
  // 因此，this.$route.query.search 表示获取当前路由的查询参数中名为 "search" 的值
      return this.$route.query.search
    }

  },
  methods: {


  },
  // 发送请求， 获取url中的search参数对应的value
  async created() {
    // 参数传一个对象
    const res = await getProList({
      goodsName: this.querySearch,
      page: this.page
    })
    console.log(res)
    this.proList = res.data.list.data
    
    const { data: { list } } = await getProList({
    categoryId: this.$route.query.categoryId,
    goodsName: this.querySearch,
    page: this.page
  })
  this.proList = list.data

  }

}
</script>

<style lang="less" scoped>
.search {
  padding-top: 46px;
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .tool {
    font-size: 24px;
    height: 40px;
    line-height: 40px;
  }

  .sort-btns {
    display: flex;
    height: 36px;
    line-height: 36px;
    .sort-item {
      text-align: center;
      flex: 1;
      font-size: 16px;
    }
  }
}

// 商品样式
.goods-list {
  background-color: #f6f6f6;
}
</style>