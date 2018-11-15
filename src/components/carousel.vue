<template>
   <div class="swiper-container">
      <div class="swiper-wrapper">
        <div v-for="list in lists" class="swp-page swiper-slide" >
          <a class="js-no-follow" :href="list.clickUrl">
            <img class="goods-main-photo fadeIn" :src="list.img"/>
          </a>
           </div>
        </div>
        <div class="swiper-pagination"></div>
   </div>
</template>
<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.css";
export default {
  name: "carousel",
  props: {
    lists: {
      //type: Array,
      required: true
    },
    name: {
      type: String
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      new Swiper(".swiper-container", {
        loop: true,
        pagination: {
          el: ".swiper-pagination" //挂载点
        },
        autoplay: {
          delay: 5000
        }
      });
    }
  }
};
</script>
<style scoped>
.swiper-slide img {
  height: 100%;
  width: 100%;
}
.swiper-container {
  position: relative;
}
</style>
