import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)//路由是一个个插件 使用
// 数组配置 这里不能写routers？？？
let routes = [
    {
    path:'/',
    component: require('../components/member.vue')
  },{
    path: '/address',
    component: require('../components/address.vue'),
    children:[{
      //跳转 重定向
      path: '',
      // component: require('./components/all.vue')//默认渲染为ALL.VUE
      redirect: 'all'
    },{
      path: 'all',
      name: 'all',
      component: require('../components/all.vue')
    },{
      path: 'form',
      name:'form',
      component: require('../components/form.vue')
    }]
  }]
  //实例化router
  let router = new VueRouter({
    routes//解构赋值
  })
  export default router 