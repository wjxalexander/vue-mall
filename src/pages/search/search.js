import "css/common.css";
import "./search.css";
import Vue from "vue";
import axios from "axios";
import url from "js/api.js";
import qs from "qs";
import mixin from "js/mixin.js";
import { InfiniteScroll } from "mint-ui"; //使用mint-UI的功能
Vue.use(InfiniteScroll);

let { keyword, id } = qs.parse(location.search.substr(1)); //截取问号
new Vue({
  el: ".container",
  data() {
    return {
      searchLists: null,
      keyword: keyword,
      id: id,
      pageNum: 1,
      isShown: false,
      pageSize: 1,
      allLoaded: false,
      onLoading: false
    };
  },
  created() {
    this.getSearchList();
  },
  methods: {
    getSearchList() {
      console.log(this.onLoading);
      this.onLoading = true;
      if (this.allLoaded) return;
      axios
        .get(url.searchList, {
          keyword: keyword,
          id: id,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        })
        .then(res => {
          let curList = res.data.lists;
          if (curList.length < this.pageSize) {
            this.allLoaded = true; //判断所有数据是否加载完毕
          }

          if (this.searchLists) {
            this.searchLists = this.searchLists.concat(curList); //list是数组方法
          } else {
            //第一次请求数据
            this.searchLists = curList;
          }
          this.pageNum++;
          console.log(this.onLoading);

          this.onLoading = false;
        });
    },
    move() {
      if (document.body.scrollTop > 100) {
        this.isShown = true;
      } else {
        this.isShown = false;
      }
    }
  },
  mixins: [mixin]
});
