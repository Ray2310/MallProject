import request from '@/utils/request'

// 获取地址列表
export const getAddressList = () => {
  // 这里后端并没有实现获取地址的内容， 所以不进行渲染，只做逻辑推理
  return request.get('/address/list')
}