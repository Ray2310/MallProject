//把引入组件的步骤抽离到单独的js文件 将需要导入的配置 放在此处。
import Vue from 'vue'
//1. 按需导入组件
import { Tabbar, TabbarItem , NavBar, Toast} from 'vant'
//2. 使用对应的组件
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(NavBar)
Vue.use(Toast)  