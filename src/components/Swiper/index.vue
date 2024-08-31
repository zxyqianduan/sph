<template>

    <swiper class="swiper" :options="swiperOption">
      <swiper-slide v-for="(item,index) in swiperList" :key="index">
        <img :src="item" alt="">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>

</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'my-Swiper',
  title: 'Loop mode / Infinite loop',
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    swiperList: Array,
    swiperOption: Object
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
