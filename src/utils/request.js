// 封装axios请求方法， 封装到request模块
import Vue from "vue"
import axios from "axios"
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
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么(默认的axios会包装一层data)
  return response.data;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});


//3. 导出
export default instance