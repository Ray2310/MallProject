// 封装axios请求方法， 封装到request模块
import { Toast } from "vant"
import axios from "axios"
import store from "@/store";
//1.  创建axios实例。 以后通过使用创建出来的axios实例 ， 进行自定义配置
// 好处： 不会污染原始的aixos实例
const instance = axios.create({
  baseURL: 'http://cba.itlike.com/public/index.php?s=/api/',
  timeout: 5000,
});


//2. 自定义配置

//2.1  配置拦截器
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const token = store.getters.token
  if (token) {
    config.headers['Access-Token'] = token
    config.headers.platform = 'H5'
  }
  // 开启loading
  Toast.loading({
    message: '加载中...',
    forbidClick: true, // 禁止背景点击（ 节流防抖操作 ）
    loadingType: 'spinner', 
    duration: 0   //不会自动消失
  })
  return config;

}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  const res = response.data
  if (res.status !== 200) {
    // 显示错误信息
    Toast(res.message)
    return Promise.reject(res.message)
  }else{
    Toast.clear()
  }
  // 对响应数据做点什么
  return res
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

//3. 导出
export default instance