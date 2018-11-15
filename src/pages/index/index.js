// 注意这里 css 与js 的含义 webpack alias的应用
import 'css/common.css'
import './index.css'
import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import { InfiniteScroll } from 'mint-ui';//使用mint-UI的功能
Vue.use(InfiniteScroll);
import Foot from 'components/Foot.vue'
import Carousel from 'components/carousel.vue'
// console.log(axios)
let app = new Vue({
  el:'#app1',
  components:{
    'j-foot':Foot,
    'j-carousel': Carousel,
  },
  data:{
    lists:null,
    bannerLists:null,
    category:null,
    pageNum: 1,
    loading: false,//是否能再加载
    allLoaded: false,
    pageSize: 6
  },
  created(){
    this.getLists()
    this.getBanner()
  },
  mounted(){
  },
  methods:{
    getLists(){
      if(this.allLoaded) return
      this.loading = true//防抖
      axios.get(url.hotLists,{
        "pageNum": this.pageNum,
        "pageSize": this.pageSize
      }).then(res=>{
        //Vue.set(this.lists, res.data.lists)报错Uncaught (in promise) TypeError: Cannot convert undefined or null to object
        let curList = res.data.lists
        if(curList.length<this.pageSize){
          this.allLoaded = true;//判断所有数据是否加载完毕
        }
        if(this.lists){
          this.lists = this.lists.concat(curList)//list是数组方法
        }else{
          //第一次请求数据
          this.lists = curList
        }
        // console.log(res)
        this.pageNum++
        this.loading = false
      })
    },
    getBanner(){
      axios.get(url.banner).then((res)=>{
        this.bannerLists = res.data.lists
        // console.log(res.data.lists)
      })
    },

  }
})