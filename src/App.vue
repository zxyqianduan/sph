<template>
  <div>
  <Header></Header>

    <router-view></router-view>
    <Footer></Footer>
<!--    <Test></Test>-->
  </div>
</template>

<script>

import Footer from '@/components/Footer/index.vue'
import Header from '@/components/Header/index.vue'
// import Test from '@/views/Test/test.vue'
export default {
  name: 'App',
  data () {
    return {}
  },
  components: {
    Footer,
    Header
    // Test
  },
  methods: {}

}

</script>

<style scoped>

</style>
