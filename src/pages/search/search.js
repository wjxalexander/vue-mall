import 'css/common.css'
import './search.css'
import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import Foot from 'components/Foot.vue'
import qs from'qs'
import mixin from 'js/mixin.js'

let {keyword,id} = qs.parse(location.search.substr(1))//截取问号
new Vue({
  el:'.container',
  data:{
    searchList:null,
    keyword
  },
  created(){
    this.getSearchList()
  },
  methods:{
    getSearchList(){
      axios.get(url.searchList, {keyword,id}).then((res) => {
        this.searchList = res.data.lists
      })
    }
  },
  mixins:[mixin]
})