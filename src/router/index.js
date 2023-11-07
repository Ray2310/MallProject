import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
//导入路由页面
import Layout from '@/views/layout'
import Search from '@/views/search'
import SearchList from '@/views/search/list'
import ProDetail from '@/views/prodetail'
import Login from '@/views/login'
import Pay from '@/views/pay'
import MyOrder from '@/views/myorder'


//2, 导入二级路由
import Home from '@/views/layout/home'
import Category from '@/views/layout/category'
import Cart from '@/views/layout/cart'
import User from '@/views/layout/user'


Vue.use(VueRouter)
const router = new VueRouter({
  // 1. 配置路由规则
  routes: [
    // 1.1 配置一级路由
    { 
      path: '/' , 
      component: Layout, 
      redirect: 'home',
     // 1.2 配置二级路由
     //在首页架子下面有四个选项， 分别是 首页、 分类、 购物车、 我的
     children: [
        {
          path: 'home',
          component: Home
        },
        {
          path: 'category',
          component: Category
        },
        {
          path: 'cart',
          component: Cart
        },
        {
          path: 'user',
          component: User
        }
      ],
    },
    { path: '/login', component: Login },
    { path: '/myorder', component: MyOrder }, 
    { path: '/search', component: Search },
    { path: '/searchlist', component: SearchList },
       // 涉及到路由的动态传参 
    { path: '/prodetail/:id', component: ProDetail },
    { path: '/pay',component: Pay },

  ]
})

// 定义数组存放需要用户登录才能访问的页面
const authUrl = ['/pay','/myorder']

// 配置全局导航守卫
router.beforeEach((to , from, next) => {
  // 1. to   往哪里去， 到哪去的路由信息对象  
  // 2. from 从哪里来， 从哪来的路由信息对象
  // 3. next() 是否放行
  //    如果next()调用，就是放行
  //    next(路径) 拦截到某个路径页面

  // 从全局数据中查看是否存在token = store.state.user.userInfo.token
  //  是否是我们用户需要登录才能访问的页面
  // 如果不是， 那么就直接 next() 放行
  // 通过getters封装我们获取token的请求
  const token =  store.getters.getToken
  if(!authUrl.includes(to.path)){
    next() 
    return
  }
  // 是需要登录才能访问的页面, 拦截请求， 并且跳转到登录页面
  if(token){ // 是否存在token
    next()
  }else{ 
    next('/login')
  }
  

})

export default router
