<template>
  <div class="floor">
    <div class="py-container" v-for="item in floorData" :key="item.id">
      <div class="title clearfix">
        <h3 class="fl">{{ item.name }}</h3>
        <div class="fr" v-for="(item2,index) in item.navList" :key="index">
          <ul class="nav-tabs clearfix">
            <li class="active">
              <a data-toggle="tab">{{item2.text}}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="tab-content">
        <div class="tab-pane">
          <div class="floor-1">
            <div class="blockgary">
              <ul class="jd-list" >
                <li v-for="(keys,index) in item.keywords" :key="index">{{keys}}</li>
              </ul>
                <img  src="@/assets/images/home/floor-1-1.png" />
            </div>
            <div class="floorBanner">
              <div class="swiper-container" id="floor1Swiper">
                <div class="swiper-wrapper">
                  <my-Swiper :swiperOption="swiperOption" :swiperList="swiperList"></my-Swiper>
                </div>
              </div>
            </div>
            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit" v-for="(url,index) in floorConverList.slice(0,2)" :key="index">
                <img :src="url" />
              </div>
            </div>
            <div class="split center">
              <img src="@/assets/images/home/floor-1-4.png" />
            </div>
            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit" v-for="(url,index) in floorConverList.slice(2,4)" :key="index">
                <img :src="url" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'FloorEl',
  data () {
    return {
      swiperList: [
        require('@/assets/images/home/floor-1-b01.png'),
        require('@/assets/images/home/floor-1-b02.png'),
        require('@/assets/images/home/floor-1-b03.png')
      ],
      floorConverList: [
        require('@/assets/images/home/floor-1-2.png'),
        require('@/assets/images/home/floor-1-3.png'),
        require('@/assets/images/home/floor-1-5.png'),
        require('@/assets/images/home/floor-1-6.png')
      ],
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        autoplay: {
          delay: 2000,
          disableOnInteraction: false
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  methods: {
    ...mapActions('home', ['getFloorData'])
  },
  mounted () {
    this.getFloorData()
  },
  computed: {
    ...mapState('home', ['floorData'])
  }
}
</script>

<style lang="scss" scoped>
.floor {
  margin-top: 15px;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .title {
      .fl {
        float: left;
        color: #c81623;
        font-size: 20px;
        line-height: 30px;
        margin: 9px 0;
        font-weight: 700;
      }

      .fr {
        float: right;

        .nav-tabs {
          margin: 10px 0 0;
          display: inline-block;

          li {
            float: left;
            line-height: 18px;

            a {
              padding-top: 1px;
              font-weight: 400;
              background-color: #fff;

              &::after {
                content: '|';
                padding: 0 10px;
              }
            }

            &:nth-child(7) {
              a {
                &::after {
                  content: '';
                }
              }
            }

            &.active {
              a {
                color: #e1251b;
              }
            }
          }
        }
      }
    }

    .tab-content {
      border-top: 2px solid #c81623;
      border-bottom: 1px solid #e4e4e4;

      .tab-pane {
        .floor-1 {
          height: 360px;
          display: flex;

          .blockgary {
            width: 210px;
            height: 100%;
            background: #f7f7f7;

            .jd-list {
              padding: 15px 0;
              overflow: hidden;

              li {
                list-style-type: none;
                float: left;
                width: 40%;
                margin: 0 10px;
                border-bottom: 1px solid #e4e4e4;
                text-align: center;
                line-height: 26px;
              }
            }

            img {
              width: 100%;
            }
          }

          .floorBanner {
            width: 330px;
            height: 100%;
          }

          .split {
            width: 220px;
            height: 100%;
            position: relative;

            .floor-x-line {
              position: absolute;
              background: #e4e4e4;
              width: 220px;
              height: 1px;
              top: 180px;
            }

            .floor-conver-pit {
              width: 100%;
              height: 50%;

              img {
                width: 100%;
                height: 100%;
                transition: all 400ms;

                &:hover {
                  opacity: 0.8;
                }
              }
            }
          }

          .center {
            border: 1px solid #e4e4e4;
          }
        }
      }
    }
  }
}
</style>
