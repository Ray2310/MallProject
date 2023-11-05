import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入vent中的需要的组件
import '@/utils/vant-ui'
import styles from '@/styles/common.less'


// 导入按需导入的配置文件
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
