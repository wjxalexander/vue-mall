import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)//路由是一个个插件 使用
// 数组配置
let routers = [{
  path:'/',
  component: require('./components/member.vue')
}]
//实例化router
let router = new VueRouter({
  routers//解构赋值
})
//根组件注册
new Vue({
  el: '#app',//这里是HTML的挂载点
  //注入路由
  router,
  mounted(){
    console.log('323')
  }
})