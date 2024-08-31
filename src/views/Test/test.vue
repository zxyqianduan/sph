<template>
  <div class="container">
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide v-for="(item,index) in swiperList" :key="index">
        <img :src="item">
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
  name: 'swiper-example-loop',
  title: 'Loop mode / Infinite loop',
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      swiperList: [
        require('@/assets/images/home/banner1.jpg'),
        require('@/assets/images/home/banner2.jpg'),
        require('@/assets/images/home/banner3.jpg'),
        require('@/assets/images/home/banner4.jpg')
      ],
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper {
  width: 300px;
  height: 300px;
}
</style>
