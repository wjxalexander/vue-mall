import './cart_base.css'
import './cart_trade.css'
import './cart.css'
import axios from 'axios'
import url from 'js/api.js'
import Vue from 'vue'
import mixin from 'js/mixin.js'
import CartService from 'js/cartService.js'
import fetch from 'js/fetch.js'
import qs from "qs";

import Velocity from 'velocity-animate'

new Vue({

  el: "#app",
  data: {
    cartLists: null,
    sum: 0,
    editingShop: null,
    editingShopIndex: -1,
    removePopup: false,
    removeData: null,
    removeMsg: null,
    removeTarget: null,
  },
  created() {
    this.getCartLists()
  },
  methods: {
    getCartLists() {
      axios.get(url.cartList).then((res) => {
        //添加checked,editing属性： 先更新属性再赋值或者set的方法
        let lists = res.data.cartList
        lists.forEach(shop => {
          shop.checked = true;
          shop.removeChecked = false
          shop.editing = false;
          shop.editingMsg = `编辑`
          shop.goodsList.forEach(good => {
            good.checked = true
            good.removeChecked = false
          })
        });
        this.cartLists = lists
      })
    },
    selectGood(shop, good) {
      let attr = this.editingShop ? 'removeChecked' : 'checked'
      good[attr] = !good[attr]
      shop[attr] = shop.goodsList.every(good => {
        return good[attr]
      })
    },
    selectShop(shop) {
      let attr = this.editingShop ? 'removeChecked' : 'checked'

      shop[attr] = !shop[attr]
      shop.goodsList.forEach(good => {
        //good.checked = (shop.checked)? true: false
        good[attr] = shop[attr]
      })
    },
    selectAll() {
      let attr = this.editingShop ? 'allRemoveChecked' : 'allSelected'

      this[attr] = !this[attr]
    },
    edit(shop, shopIndex) {
      shop.editing = !shop.editing
      shop.editingMsg = (shop.editing) ? '完成' : '编辑'
      //当前店铺编辑 其他店铺不显示
      this.cartLists.forEach((item, idx) => {
        if (shopIndex != idx) {
          item.editing = false
          item.editingMsg = (shop.editing) ? ' ' : '编辑'
        }
      })
      this.editingShop = shop.editing ? shop : null
      this.editingShopIndex = shop.editing ? shopIndex : -1
    },
    onSwipeLeft(shop) {
      shop.editing = true
    },
    reduce(good) {
      if (good.number === 1) return
      axios.post(url.addCart, {
        id: good.id,
        number: 1
      }).then(res => {
        good.number--//直接该本地数据无需重复请求，如果异步请求没有成功，则本地数据也不修改
      })

    },
    add(good) {
      add(good.id).then(res => {
        good.number++//直接该本地数据无需重复请求，如果异步请求没有成功，则本地数据也不修改
      })
    },
    remove(shop, shopIndex, good, goodIndex) {
      this.removePopup = true
      this.removeData = { shop, shopIndex, good, goodIndex }
      this.removeMsg = `确认要将${good.title}删除吗？`
      this.removeTarget = 'single'
    },
    removeList() {
      this.removePopup = true
      this.removeMsg = `确定将所选的${this.removeLists.length}个商品删除`
      this.removeTarget = 'multi'
    },
    removeConfirm() {
      if (this.removeTarget === 'single') {
        let { shop, shopIndex, good, goodIndex } = this.removeData//解构
        axios.post(url.cartRemove, {
          id: good.id
        }).then(res => {
          shop.goodsList.splice(goodIndex, 1)
          if (shop.goodsList.length === 0) {
            this.cartLists.splice(shopIndex, 1)//移除店铺切换回来
            this.removeShop()//切换回正常状态
          }
          this.removePopup = false
          // this.$refs[`goods-${shopIndex}-${goodIndex}`][0].style.left = '0px'
          // refs返回一个数组
        })
      }else{
        let ids = []
        this.removeLists.forEach(good=>{
          ids.push(good.id)
        })
        axios.post(url.cartAllRemove,{
          ids,
        }).then(res=>{
          let arr = []
          this.editingShop.goodsList.forEach(good=>{
            let index = this.removeLists.findIndex(item=>{
              return item.id == good.id
            })
            if (index === -1){
              arr.push(good)//根据反馈的数据确立没有被删的id
            }
          });
          if(arr.length){
            this.editingShop.goodsList = arr
          }else{
            this.cartLists.splice(this.editingShopIndex,1)
            this.removeShop()
          }
          this.removePopup = false
        })
      }

    },
    removeShop() {//完成店铺删除后，其他店铺状态需要还原为初始值
      this.editingShop = null
      this.editingShopIndex = -1
      this.removeMsg = null
      this.cartLists.forEach(shop => {//遍历还原
        shop.editing = false
        shop.editingMsg = '编辑'
      })
    },
    start(e,good){
      good.startx = e.changedTouches[0].clientX//初始X轴坐标,无需响应式

    },
    end(e,good,shopIndex,goodIndex){
      let endx = e.changedTouches[0].clientX//初始X轴坐标
      let left = '0'
      if(good.startx - endx >100){
        left = '-60px'
      }
      if(endx- good.startx >100){
        left = '0px'
      }
      Velocity(this.$refs[`goods-${shopIndex}-${goodIndex}`], {left})
    }
  },
  computed: {
    allSelected: {
      //正向读取
      get() {
        if (this.cartLists && this.cartLists.length > 0) {
          return this.cartLists.every(shop => {
            return shop.checked
          })
        }
        return false
      },
      //设置新的值
      set(newVal) {
        this.cartLists.forEach(shop => {
          shop.checked = newVal
          shop.goodsList.forEach(good => {
            good.checked = newVal
          })
        })
      }

    },
    allRemoveChecked: {
      get() {
        if (this.editingShop) {
          return this.editingShop.removeChecked
        }
        return false
      },
      set(newVal) {
        if (this.editingShop) {
          this.editingShop.removeChecked = newVal;
          this.editingShop.goodsList.forEach(good => {
            good.removeChecked = newVal
          })
        }
      }
    },
    selectedLists() {
      if (this.cartLists && this.cartLists.length > 0) {
        let arr = []
        let total = 0
        this.cartLists.forEach(shop => {
          shop.goodsList.forEach(good => {
            if (good.checked) {
              arr.push(good)
              total += good.price * good.number
            }
          })
        })
        this.sum = total
        return arr
      }
      return []
    },
    removeLists() {//计算属性的用处 返回一个再编辑状态下被选定的数组
      if (this.editingShop) {
        let arr = []
        this.editingShop.goodsList.forEach(good => {
          if (good.removeChecked) {
            arr.push(good)
          }
        })
        return arr
      }
      return []
    },
   
  },
  mixins: [mixin]
})
