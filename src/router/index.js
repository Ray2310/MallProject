import Vue from 'vue'
import VueRouter from 'vue-router'
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

export default router
