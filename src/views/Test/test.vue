<template>
 <div>
   <el-select v-model="value" placeholder="请选择">
     <el-option
       v-for="item in options"
       :key="item.value"
       :label="item.label"
       :value="item.value">
     </el-option>
   </el-select>
   <ShopCart></ShopCart>
 </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
export default {
  name: 'ElSelectDemo',
  data () {
    return {
      options: [],
      value: ''
    }
  },
  components: { ShopCart: defineAsyncComponent(() => import('@/views/ShopCart/index.vue')) }
}
</script>
