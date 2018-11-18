import './goods_common.css'
import './goods_custom.css'
import './goods.css'
import './goods_theme.css'
import './goods_mars.css'
import './goods_sku.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import mixin from 'js/mixin.js'
import qs from "qs";
import Carousel from 'components/carousel.vue'

//tab切换：焦点状态：下标处理。

let {id} = qs.parse(location.search.substr(1));
let detailTab = ['商品详情','本店成交']
new Vue({
  el:'#app',
  data:{
    details:null,
    detailTab,
    currIndex:0,
    deals:null,
    loading: false,
    bannerLists:  null,
  },
  components:{
    'j-carousel': Carousel,
  },
  created(){
    this.getDetails()
  },
  methods:{
    getDetails(){
      axios.get(url.details,{id}).then(res=>{
        this.details = res.data.data
        this.bannerLists = []
        this.details.imgs.forEach(element => {
          this.bannerLists.push({
            clickUrl:'',
            img: element
          })
        });
      })
    },
    getDeals(){
      axios.get(url.deals,{id}).then(res=>{
        this.deals = res.data.data.lists
      })
    },
    changeTab(index){
      this.currIndex = index
      if(index){
        this.getDeals()
      }
    }
  },
  mixins:[mixin]
})