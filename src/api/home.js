// 首页的api接口渲染封装
import request from '@/utils/request'
// 1. 获取首页需要的请求内容
export const getHomeData = () => {
  return request.get('/page/detail', {
    params: {
      pageId: 0
    }
  })
}

