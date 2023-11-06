// 登录相关的接口请求
//1. 获取图形验证码
import request from '@/utils/request'
export const getPicCode = ()=> {
  return request.get('/captcha/image')
}

//2. 获取短信验证码的请求接口
export const getMsCode = (captchaCode,captchaKey,mobile) =>{
  // 按照接口文档的要求， 需要传惨
  return request.post('/captcha/sendSmsCaptcha',{
    form:{
        captchaCode,
        captchaKey,
        mobile
    }
  })
}

//3. 点击登录请求接口
export const loginClick = ( isParty,mobile,partyData,smsCode) => {
  return request.post('/passport/login',{
    form: {
      isParty,
      mobile,
      partyData,
      smsCode
    }
  })
}