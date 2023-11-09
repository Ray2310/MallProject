
<template>
  <div class="search">
    <van-nav-bar title="商品搜索" left-arrow @click-left="$router.go(-1)" />

    <van-search v-model="search" show-action placeholder="请输入搜索关键词" clearable>
      <template #action>
        <div @click="goSearch(search)">搜索</div>
      </template>
    </van-search>

    <!-- 搜索历史 -->
    <div class="search-history" v-if="history.length > 0">
      <div class="title">
        <span>最近搜索</span>
        <!-- 清空搜索历史 ，就是删除history中的内容 -->
        <van-icon name="delete-o" size="16" @click="clear()" />
      </div>
      <div class="list">
        <div  v-for="(item) in history" class="list-item" @click="goSearch(item)">{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHistoryList, setHistoryList } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  data() { 
    return {
      // 搜索历史的基本渲染
      history: getHistoryList(),
      search: '', // 绑定输入框搜索的内容
    }
  },
  methods: {
    // searchItem 就是我们点击搜索的内容
    goSearch(searchItem) { 
      console.log(searchItem)
      // 然后向history中追加记录， 再进行渲染新的搜索历史
      const index = this.history.indexOf(searchItem) // 查找当前searchItem 在history中的位置
      // 如果当前添加的存在历史记录里面 
      if(index !== -1) {
        // 删除原来的 ，再重新添加， 这样就能保证新搜索的内容再最前面
        this.history.splice(index, 1)
      }
      // 将最新的搜索内容添加到history前面
      this.history.unshift(searchItem)
      setHistoryList(this.history)
      
      // 跳转到当前的搜索页
      this.$router.push(`/searchList?search=${searchItem}`)
    },
    // 点击删除按钮清空所有的数据
    clear() {
      this.history=[]
      setHistoryList([])
    }
  }

}

</script>

<style lang="less" scoped>
.search {
  .searchBtn {
    background-color: #fa2209;
    color: #fff;
  }
  ::v-deep .van-search__action {
    background-color: #c21401;
    color: #fff;
    padding: 0 20px;
    border-radius: 0 5px 5px 0;
    margin-right: 10px;
  }
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }
  .list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px;
    gap: 5%;
  }
  .list-item {
    width: 30%;
    text-align: center;
    padding: 7px;
    line-height: 15px;
    border-radius: 50px;
    background: #fff;
    font-size: 13px;
    border: 1px solid #efefef;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }
}
</style>
