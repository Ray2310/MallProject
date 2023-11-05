// 登录相关的接口请求
//1. 获取图形验证码
import request from '@/utils/request'
export const getPicCode = ()=> {
  return request.get('/captcha/image')
}

