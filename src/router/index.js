import Vue from 'vue'
import Router from 'vue-router'
const index = ()=>import ('../pages/index')
const login = ()=>import ('../pages/login')
const welcome = ()=>import ('../pages/welcome')
const manage = ()=>import ('../pages/manage')
const water = ()=>import ('../pages/water')
const jiajiao = ()=>import ('../pages/jiajiao')
const banner = ()=>import ('../pages/banner')
const jiazheng = ()=>import ('../pages/jiazheng')
const updatePass = ()=>import ('../pages/updatePass')
const weixiu = ()=>import ('../pages/weixiu')


const upload =()=>import ('../pages/upload')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/index',
      component:index,
      children:[
      {
        path:'welcome',
        component:welcome
      },
      {
        path:'manage',
        component:manage,
        name:'管理员管理'
      },
      {
        path:'banner',
        component:banner,
        name:'轮播图管理'
      },
      {
        path:'water',
        component:water,
        name:'水站管理'
      },
      {
        path:'jiajiao',
        component:jiajiao,
        name:'家教管理'
      },
      {
        path:'updatePass',
        component:updatePass,
        name:'修改密码'
      },
      {
        path:'jiazheng',
        component:jiazheng,
        name:'家政管理'
      },
      {
        path:'weixiu',
        component:weixiu,
        name:'维修管理'
      },
  
      {
        path:"upload",
        component:upload
      },
      {
        path:'',
        redirect:'welcome'
      },
      
    ]
    },
    {
      path:'/login',
      component:login
    },
   
    {
      path:'*',
      component:login
    },
  ]
})
