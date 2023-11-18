// 购物车相关的接口请求。
import request from '@/utils/request'
//1.  加入购物车
// 参数： 商品id 商品编号 商品类型id
export const addCart = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/add', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

// 2. 购物车列表接口
export const getCartList = () =>{ 
  return request.get('/cart/list')
}

//3. 更新购物车商品数量
export const changeCount = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/update', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

//4.  删除购物车
export const delSelectShop = (cartIds) => {
  return request.post('/cart/clear', {
    cartIds
  })
}