<template>
  <div>
  <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>

import Footer from '@/components/Footer/index.vue'
import Header from '@/components/Header/index.vue'
export default {
  name: 'App',
  data () {
    return {}
  },
  components: {
    Footer,
    Header
  },
  methods: {}

}

</script>

<style scoped>

</style>
