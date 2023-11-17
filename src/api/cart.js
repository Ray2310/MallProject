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
