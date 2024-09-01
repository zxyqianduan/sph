<template>
  <div class="pagination">
    <button :disabled="pageNo===1">上一页</button>
    <button v-if="startEnd.start!==1">1</button>
    <span v-if="startEnd.start > 2">···</span>

    <button :class="{ active:pageNo === startEnd.start + index}" v-for="(item,index) in startEnd.end - startEnd.start + 1" :key="item">{{startEnd.start + index}}</button>

    <span v-if="startEnd.end < pageTotal - 1 ">···</span>
    <button v-if="startEnd.end !== pageTotal">{{ pageTotal }}</button>
    <button :disabled="startEnd.end">下一页</button>

    <span>共 {{total}} 条</span>
  </div>
</template>

<script>
export default {
  name: 'VPagination',
  props: {
    total: {
      type: Number,
      required: true
    },
    pageSize: {
      type: Number,
      default: 5
    },
    pageNo: {
      type: Number,
      default: 1
    },
    continues: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {

    }
  },
  computed: {
    startEnd() {
      let start = 0
      let end = 0
      // 1.特殊情况，连续展示页码数大于总页码数
      if (this.continues > this.pageTotal) {
        start = 1
        end = this.pageTotal
      } else {
        start = this.pageNo - (this.continues - 1) / 2
        end = this.pageNo + (this.continues - 1) / 2
        // 2.特殊情况，起始头小于 1
        if (start < 1) {
          start = 1
          end = this.continues
        } else if (end > this.pageTotal) { // 3.特殊情况，结束头大于总页码数
          console.log(this.pageTotal)
          start = this.pageTotal - this.continues + 1
          end = this.pageTotal
        }
      }

      return { start, end }
    },
    pageTotal() {
      // 向上取整
      return Math.ceil(this.total / this.pageSize)
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  text-align: center;

  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: gray;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #c81623;
      color: #fff;
    }
  }

  span {
    display: inline-block;
    line-height: 28px;
    font-size: 14px;
    color: gray;
    vertical-align: middle;
  }
}
</style>
