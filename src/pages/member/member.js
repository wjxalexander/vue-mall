import Vue from 'vue'
import router from './router'
import store from './vuex'

//根组件注册
new Vue({
  el: '#app',//这里是HTML的挂载点
  //注入路由,vuex
  router,
  store
})