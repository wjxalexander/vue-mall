import 'css/common.css'
import './category.css'
import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
// import Foot from 'components/Foot.vue'
import mixin from 'js/mixin.js'

new Vue({
  // components: {
  //   'j-foot': Foot,
  // },
  el: '#categoryapp',
  data() {
    return {
      categoryList: null,
      subData: null,
      rankData: null,
      hotGoods: null,
      hotShops: null,
      hotKeywords: null,
      brandList: null,
      topIndex: 0
    }
  },
  created() {
    this.getCategory()
    this.getSubList(0, 0)
  },
  mounted() {
  },
  methods: {
    getCategory() {
      axios.get(url.category).then((res) => {
        this.categoryList = res.data.lists
      })
    },
    getSubList(id, index) {
      //为什么要传id： 通过id请求数据，这样每次点击不同标签页的时候获得不同的数据开始渲染，这样达到不同标签页不同的内容，subData是不同的
      this.topIndex = index;
      if (index === 0) {
        this.getrank()
      } else {
        axios.get(url.sublist, { id: id }).then((res) => {
          this.subData = res.data.data
          this.brandList = res.data.data.brandList
        })
      }
    },
    getrank() {
      axios.get(url.ranklist).then((res) => {
        this.rankData = res.data.data
        this.hotGoods = res.data.data.hotGoods
        this.hotShops = res.data.data.hotShops
        this.hotKeywords = res.data.data.hotKeywords
      })
    },
    toSearch(list) {
      //传入对应参数keyword和id
      location.href = `search.html?keyword=${list.name}&id=${list.id}`
    }
  },
  //   filters: {
  //     completeNum(number) {
  //       // let value=Math.round(parseFloat(number)*100)/100;
  //       // let xsd = value.toString().split(".");
  //       // if (xsd.length == 1) {
  //       //   value = value.toString() + ".00";
  //       //   return value;
  //       // }
  //       // if (xsd.length > 1) {
  //       //   if (xsd[1].length < 2) {
  //       //     value = value.toString() + "0";
  //       //   }
  //       //   return value;
  //       // }
  //       return Number.parseFloat(number).toFixed(2);
  //     }
  // }
  //混入
  mixins: [mixin]

})