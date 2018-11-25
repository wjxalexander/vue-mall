<template>
   <div class="container " style="min-height: 597px;">
     <!-- 为什么要绑定key：VUE的DOM是就地复用不绑定会引起类似‘继承的问题’ -->
    <div class="block-list address-list section section-first js-no-webview-block" v-if = "lists&&lists.length">
      <a class="block-item js-address-item address-item "
      v-for="list in lists"
      :key = "list.id"
      @click='toEdit(list)'
      :class="{'address-item-default':list.isDefaut}">
        <div class="address-title">{{list.name}}{{list.tel}}</div>
        <p>{{list.provinceName}}{{list.cityName}}{{list.districtName}}{{list.address}}</p>
        <a class="address-edit"></a>
      </a>
    </div>
    <div v-if = "lists&&!lists.length"> 
      没有地址，请添加
    </div>
    <div class="block stick-bottom-row center">
      <router-link class="btn btn-blue js-no-webview-block js-add-address-btn" 
        :to="{name:'form',query:{type:'add'}}">
            新增地址
        </router-link>
    </div>
  </div>
</template>
<script>
import Address from "js/addressService.js";
export default {
  data() {
    return {
      lists: null
    };
  },
  created() {
    Address.list().then(res => {
      this.lists = res.data.lists;
    });
  },
  methods: {
    toEdit(list) {
      //组件的注入 编程式导航
      this.$router.push({
        // path: "/address/form"
        name: 'form',
        query:{
          type: 'edit',
          instance: list 
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
