<template>
  <div class="spec-preview">
    <vue-photo-zoom-pro
      :width="200"
      :height="200"
      :high-url="srcUrl || skuImg"
      :out-zoomer="true"
    >
      <img :src="srcUrl || skuImg" alt=""/>
    </vue-photo-zoom-pro>
  </div>

</template>

<script>
import VuePhotoZoomPro from 'vue-photo-zoom-pro'
import 'vue-photo-zoom-pro/dist/style/vue-photo-zoom-pro.css'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Zoom',
  props: {
    skuImg: {
      type: String
    }
  },
  data () {
    return {
      srcUrl: ''
    }
  },
  components: {
    VuePhotoZoomPro
  },
  mounted () {
    this.$eventBus.$on('displaypicture', (imgUrl) => {
      this.srcUrl = imgUrl
    })
  }
}
</script>

<style lang="scss">
  .spec-preview {
    position: relative;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }
    .selector {
      background-color: rgba(248, 152, 152, 0.2);
    }

  .out-zoomer{
    z-index: 99;
    position: absolute;
    top: 0 !important;
    left: 0;
  }

  }
</style>
