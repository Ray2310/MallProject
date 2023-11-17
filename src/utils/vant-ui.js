//把引入组件的步骤抽离到单独的js文件 将需要导入的配置 放在此处。
import Vue from 'vue'
//1. 按需导入组件
import { Rate,Dialog,Lazyload,Icon,Tabbar, TabbarItem , NavBar, Toast, Search, Swipe, SwipeItem, Grid, GridItem, ActionSheet} from 'vant'
//2. 使用对应的组件
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(NavBar)
Vue.use(Toast)  
Vue.use(GridItem)
Vue.use(Search)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Grid)
Vue.use(Icon)
Vue.use(Lazyload)
Vue.use(ActionSheet)
Vue.use(Dialog)
Vue.use(Rate)