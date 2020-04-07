// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
var x=10;
import Vue from 'vue'
import App from './App'
import router from './router'
//引入全局组件
import components from './components/index'
for (let i in components) {
  Vue.component(i, components[i])
}
//引入全局过滤器
import filter from './filter/index'
for (let i in filter) {
  Vue.filter(i, filter[i])
}
//引入axios
import axios from 'axios'

Vue.prototype.axios = axios
//test
Vue.prototype.y = 10
Vue.prototype.x=x;
axios.interceptors.response.use(response => {
  // console.log('==============数据' + response.config.url + '==================')
  // console.log(response)
  // console.log('==============over' + response.config.url + '==================')
  if (response.data.code == -1) {
    router.replace('/login')
    return
  }
  return response
})
//login拦截
router.beforeEach((to, from, next) => {
  if (to.path == "/login") {
    next()
    return
  }
  if (!localStorage.getItem('username')) {
    next('/login')
    return
  }
  next()
})
// 引入reset.css
import './assets/css/reset.css'
//引入vuex
import store from './store/index'
//引入ele-ui
import ele from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import { request } from 'https'
Vue.use(ele)



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
