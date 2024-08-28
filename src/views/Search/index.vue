<template>
  <div>
  搜索
  </div>
</template>

<script>

import { reqCategoryList } from '@/api/Home'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Search',
  data () {
    return {
    }
  },
  methods: {
    async getdata () {
      // const res = await request.get('/api/product/getBaseCategoryList1')
      // console.log(res)
      try {
        const res = await reqCategoryList()
        console.log(res)
      } catch (error) {
        alert(error.message)
      }
    }
  },
  mounted () {
    this.getdata()
  }

}

</script>

<style scoped>

</style>
