<template>
  <div class="outer">
    <!-- 三级分类导航 -->
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--面包屑导航-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <span>全部结果</span>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="searchparams.trademark">
              {{ searchparams.trademark.split(":")[1] }}
              <i @click="deleteTrademark">x</i>
            </li>
            <li class="with-x" v-if="searchparams.categoryName">
              {{ searchparams.categoryName }}
              <i @click="deleteCategoryName">x</i>
            </li>
            <li class="with-x" v-if="searchparams.keyword">
              {{ searchparams.keyword }}
              <i @click="deleteKeyword">x</i>
            </li>
            <li
              class="with-x"
              v-if="searchparams.props"
              v-for="(item, index) in searchparams.props"
              :key="index"
            >
              {{ item.split(":")[1] }}
              <i @click="deleteProps(index)">x</i>
            </li>
          </ul>
        </div>

        <!-- 搜索器 -->
        <SearchSelector @getprops="getprops" @getTrademark="getTrademark" />

        <!--商品展示区-->
        <div class="details clearfix">
          <!-- 列表操作区 -->
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li
                  :class="{ active: orderType === '1' }"
                  @click="orderData('1')"
                >
                  <a
                    >综合<span
                      v-show="orderType === '1'"
                      :class="orderSort"
                    ></span>
                  </a>
                </li>
                <li
                  :class="{ active: orderType === '2' }"
                  @click="orderData('2')"
                >
                  <a
                    >价格<span
                      v-show="orderType === '2'"
                      :class="orderSort"
                    ></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品列表 -->
          <div v-if="searchInfo.goodsList.length > 0" class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="item in searchInfo.goodsList"
                :key="item.id"
              >
                <div class="list-wrap" @click="toDetail(item.id)">
                  <div class="p-img">
                    <a>
<!--                      <img class="lazyload"-->
<!--                           :data-src="item.defaultImg"-->
<!--                           src='./images/image.png'-->
<!--                           alt="" />-->
                      <img v-lazy="item.defaultImg" alt="" />
                    </a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ item.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a :title="item.title">{{ item.title }}</a>
                  </div>
                  <div class="commit">
                    <i class="command"
                      >已有<span>{{ item.price }}</span
                      >人评价</i
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div v-else class="goods-kong">
            <img src="./images/image.png" alt="" />
            <h1>搜索商品结果为空</h1>
          </div>
          <VPagination
            :total="searchInfo.total"
            :pageSize="searchInfo.pageSize"
            :pageNo="searchInfo.pageNo"
            :continues="searchInfo.continues"
            @pageNum="pageNum"
          >
          </VPagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector'
import { mapState } from 'vuex'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Search',
  components: {
    SearchSelector
  },
  data () {
    return {
      // 搜素参数
      searchparams: {
        category1Id: '', // 一级分类id(可选参数）
        categpry2Id: '', // 二级分类id(可选参数）
        category3Id: '', // 三级分类id(可选参数）
        categoryName: '', // 分类名（可选参数）
        keyword: '', // 关键词（可选参数）
        props: [], // 商品属性（可选参数）
        trademark: '', // //品牌（可选参数）
        order: '1:desc', // 排序（可选参数）
        pageNo: 1, // 当前页码（必选项！!!!!!)
        pageSize: 10 // 每页展示多少条（必选项！
      }
    }
  },
  methods: {
    getTrademark (value) {
      this.searchparams.trademark = value
      this.searchparams.pageNo = 1
    },
    getprops (value) {
      if (this.searchparams.props.indexOf(value) === -1) {
        this.searchparams.props.push(value)
      }
      this.searchparams.pageNo = 1
    },
    deleteCategoryName () {
      const { keyword } = this.$route.query
      this.searchparams.pageNo = 1
      this.$router.push({
        path: '/search',
        query: {
          keyword
        }
      })
    },
    deleteKeyword () {
      const { keyword, ...params } = this.$route.query
      this.searchparams.pageNo = 1
      this.$router.push({
        path: '/search',
        query: {
          ...params
        }
      })
    },
    deleteTrademark () {
      this.searchparams.trademark = undefined
      this.searchparams.pageNo = 1
    },
    deleteProps (index) {
      this.searchparams.pageNo = 1
      this.searchparams.props.splice(index, 1)
    },
    pageNum (num) {
      this.searchparams.pageNo = num
    },
    orderData (type) {
      const [ordertype, ordersort] = this.searchparams.order.split(':')

      if (ordertype === type) {
        this.searchparams.order =
          ordersort === 'desc' ? `${type}:asc` : `${type}:desc`
      } else {
        this.searchparams.order = `${type}:desc`
      }
    },
    toDetail (id) {
      this.$router.push({
        path: `/detail/${id}`
      })
    }
  },
  computed: {
    ...mapState('search', ['searchInfo']),
    orderType () {
      return this.searchparams.order.split(':')[0]
    },
    orderSort () {
      return this.searchparams.order.split(':')[1] === 'desc'
        ? 'iconfont icon-shangjiantou-'
        : 'iconfont icon-xiajiantou'
    }
  },
  mounted () {},
  watch: {
    $route: {
      handler (newVal) {
        const resetParams = {
          category1Id: '', // 一级分类id(可选参数）
          categpry2Id: '', // 二级分类id(可选参数）
          category3Id: '', // 三级分类id(可选参数）
          categoryName: '', // 分类名（可选参数）
          keyword: '' // 关键词（可选参数）
        }
        this.searchparams.pageNo = 1
        Object.assign(this.searchparams, resetParams, newVal.query)
      },
      immediate: true
    },
    searchparams: {
      handler () {
        this.$store.dispatch('search/getSearchList', this.searchparams)
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: 5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .goods-kong {
        margin: 20px auto;
        width: 100%;
        text-align: center;
        img {
          width: 20%;
          height: 20%;
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
