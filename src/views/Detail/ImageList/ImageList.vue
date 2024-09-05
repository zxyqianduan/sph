<template>
  <div class="swiper-container">
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide v-for="(item,index) in imgList" :key="index">
        <img @click="displaypicture(item.imgUrl)" :src="item.imgUrl" alt="">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  name: 'ImageList',
  components: { Swiper, SwiperSlide },
  data () {
    return {
      swiperOption: {
        slidesPerView: 5,
        spaceBetween: 20,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  props: {
    imgList: {
      type: Array
    }
  },
  methods: {
    displaypicture (imgUrl) {
      this.$eventBus.$emit('displaypicture', imgUrl)
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
  .swiper-container {

    box-sizing: border-box;

    .swiper-slide {
      width: 56px;
      height: 56px;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }

        &:hover {
          border: 2px solid #f60;
          padding: 1px;
        }
      }
    }
    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>
