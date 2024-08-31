<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div class="nav-left" @mouseleave="show">
        <h2 class="all" @mouseenter="isShow = true">全部商品分类</h2>
        <transition
          enter-active-class="animate__animated  animate__fadeIn"
          leave-active-class="animate__animated animate__fadeOut">
          <div v-show="isShow" class="sort">
            <div class="all-sort-list2" @click="toSearch">
              <div class="item" v-for="item in CategoryList" :key="item.categoryId">
                <h3>
                  <a :data-num="1" :data-id="item.categoryId">{{ item.categoryName }}</a>
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem" v-for="cate in item.categoryChild" :key="cate.categoryId">
                    <dl class="fore">
                      <dt>
                        <a :data-num="2" :data-id="cate.categoryId">{{ cate.categoryName }}</a>
                      </dt>
                      <dd>
                        <em v-for="cateitem in cate.categoryChild" :key="cateitem.categoryId">
                          <a :data-num="3" :data-id="cateitem.categoryId">{{ cateitem.categoryName }}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TypeNav',
  data () {
    return {
      isShow: this.$route.path === '/home'
    }
  },
  methods: {
    show () {
      if (this.$route.path !== '/home') {
        this.isShow = false
      }
    },
    toSearch (e) {
      const { id, num } = e.target.dataset
      const { innerHTML } = e.target
      const { keyword } = this.$route.query
      // this.$router.push(`/search?category${num}Id=${id}&categoryName=${name}`)
      if (id) {
        this.$router.push({
          path: '/search',
          query: {
            [`category${num}id`]: id,
            categoryName: innerHTML,
            keyword
          }
        })
      }
    }
  },
  mounted () {
  },
  computed: {
    ...mapState('home', ['CategoryList'])
  }
}
</script>

<style lang="scss" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      transition: 0.1s;
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
