<template>
  <div class="pagination">
    <button :disabled="pageNo === 1" @click="pageNum(pageNo - 1)">上一页</button>
    <button v-if="startEnd.start !== 1" @click="pageNum(1)">1</button>
    <span v-if="startEnd.start > 2">···</span>

    <button
      :class="{ active: pageNo === startEnd.start + index }"
      v-for="(item, index) in startEnd.end - startEnd.start + 1"
      :key="index"
      @click="pageNum(startEnd.start + index)"
    >
      {{ startEnd.start + index }}
    </button>

    <span v-if="startEnd.end < pageTotal - 1">···</span>
    <button v-if="startEnd.end !== pageTotal" @click="pageNum(pageTotal)">{{ pageTotal }}</button>
    <button :disabled="pageNo == startEnd.end" @click="pageNum(pageNo + 1)">下一页</button>

    <span>共 {{ total }} 条</span>
  </div>
</template>

<script>
export default {
  name: 'VPagination',
  props: {
    total: {
      type: Number,
      required: true,
      default: 0
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
  data () {
    return {}
  },
  methods: {
    pageNum (pageNo) {
      this.$emit('pageNum', pageNo)
    }
  },
  computed: {
    startEnd () {
      let start = 0
      let end = 0

      // 特殊情况：连续显示页码数大于总页码数
      if (this.continues > this.pageTotal) {
        start = 1
        end = this.pageTotal
      } else {
        // 正常情况：计算连续显示，起始和结束的的页码数
        start = this.pageNo - (this.continues - 1) / 2
        end = this.pageNo + (this.continues - 1) / 2
        // 特殊情况：计算出的起始页码数小于1,则起始页码数设置为1，结束页码数等于连续显示页码数
        if (start < 1) {
          start = 1
          end = this.continues
        } // 特殊情况：计算出的结束页码数大于总页码数，则起始页码数等于总页码数减连续显示页码数+1，
        // 结束页码数等于总页码数
        else if (end > this.pageTotal) {
          end = this.pageTotal
          start = end - this.continues + 1
        }
      }
      return { start, end }
    },

    // 总页码数
    pageTotal () {
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
