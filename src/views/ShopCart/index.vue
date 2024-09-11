<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="item in goodsInfo" :key="item.id">
          <li class="cart-list-con1">
            <input
              @click="SetChecked(item)"
              type="checkbox"
              :checked="item.isChecked"
              name="chk_list"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl" />
            <div class="item-msg">
              {{ item.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ item.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a @click="countNum(item, 'minus', $event)" class="mins">-</a>
            <input
              autocomplete="off"
              type="text"
              :value="item.skuNum"
              minnum="1"
              class="itxt"
              @change="countNum(item, 'input', $event)"
            />
            <a @click="countNum(item, 'add', $event)" class="plus">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ item.cartPrice * item.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a @click="deleteCart(item)" class="sindelet">删除</a>
            <br />
          </li>
        </ul>
      </div>
    </div>
    <div v-if="goodsInfo.length !== 0" class="cart-tool">
      <div class="select-all">
        <input
          :checked="SelectAll"
          @click="SelectlistAll"
          class="chooseAll"
          type="checkbox"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteCartAll">删除所有商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ total }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ allMoney }}</i>
        </div>
        <div class="sumbtn">
          <router-link to="/trade" class="sum-btn">结算</router-link>
        </div>
      </div>
    </div>
    <div style="text-align: center" v-if="goodsInfo.length === 0">
      <h3>购物车空空如也</h3>
      <span style="font-size: 100px" class="iconfont icon-kong-gouwuche"></span>
    </div>
  </div>
</template>

<script>
import {
  getCartList,
  setchecked,
  SelectListAll,
  deletedCart,
  deleteAll,
} from "@/api/cart";
import { reqAddToCart } from "@/api/detail";
export default {
  name: "ShopCart",
  data() {
    return {
      goodsInfo: [],
    };
  },
  methods: {
    // 获取购物车数据
    async getCartData() {
      const res = await getCartList();
      if (res.code === 200) {
        this.goodsInfo = res.data;
      }
    },

    // 选中单个购物车商品
    async SetChecked(item) {
      let { skuId, isChecked } = item;
      isChecked = isChecked === 1 ? 0 : 1;
      const res = await setchecked(skuId, isChecked);
      if (res.code === 200) {
        item.isChecked = isChecked;
      }
    },

    // 全选购物车商品
    async SelectlistAll(e) {
      let { checked } = e.target;
      const newisChecked = checked ? 1 : 0;
      const skuidList = this.goodsInfo.map((item) => item.skuId);
      const res = await SelectListAll(newisChecked, skuidList);
      if (res.code === 200) {
        this.goodsInfo.forEach((item) => {
          item.isChecked = newisChecked;
        });
      }
    },
    // 删除单个商品
    async deleteCart(item) {
      const { skuId } = item;
      this.$confirm("确定删除此商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
      })
        .then(async () => {
          const res = await deletedCart(skuId);
          if (res.code === 200) {
            this.getCartData();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    // 删除全部商品
    async deleteCartAll() {
      this.$confirm("确定删除购物车全部商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
      })
        .then(async () => {
          const res = await deleteAll();
          if (res.code === 200) {
            this.getCartData();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    // 购物车商品数量加减
    async countNum(item, type, e) {
      let { skuId, skuNum } = item;
      let { value } = e.target;
      const reg = /^(1|[1-9][0-9]?|1[0-9]{2}|200)$/.test(value);
      if (type === "input") {
        if (reg) {
          const chazhi = value - skuNum;
          const res = await reqAddToCart(skuId, chazhi);
          if (res.code === 200) {
            item.isChecked = "1";
            item.skuNum = Number(value);
          }
        } else if (!/[0-9]/.test(value)) {
          this.$message({
            message: "请输入合法数字",
            type: "error",
          });
          item.skuNum = e.target.value = skuNum;
        } else {
          this.$message({
            message: "最大购买商品数量不能超过200",
            type: "error",
          });
          item.skuNum = e.target.value = skuNum;
        }
      } else if (type === "add") {
        if (item.skuNum === 200)
          return this.$message({
            message: "最大购买商品数量不能超过200",
            type: "error",
          });
        const res = await reqAddToCart(skuId, 1);
        if (res.code === 200) {
          item.isChecked = "1";
          item.skuNum = e.target.value = skuNum + 1;
        }
      } else if (type === "minus") {
        if (item.skuNum === 1)
          return this.$message({
            message: "最大购买商品数量不能超过200",
            type: "error",
          });
        item.isChecked = "1";
        const res = await reqAddToCart(skuId, -1);
        if (res.code === 200) {
          item.isChecked = "1";
          item.skuNum = e.target.value = skuNum - 1;
        }
      }
    },
  },
  computed: {
    // 全选按钮状态
    SelectAll() {
      return (
        this.goodsInfo.every((item) => item.isChecked === 1) &&
        this.goodsInfo.length > 0
      );
    },

    // 总数量
    total() {
      let total = 0;
      this.goodsInfo.forEach((item) => {
        if (item.isChecked === 1) {
          total += item.skuNum;
        }
      });
      return total;
    },

    // 总金额
    allMoney() {
      let allMoney = 0;
      this.goodsInfo.forEach((item) => {
        if (item.isChecked === 1) {
          allMoney += item.cartPrice * item.skuNum;
        }
      });
      return allMoney;
    },
  },
  mounted() {
    this.getCartData();
  },
};
</script>

<style lang="scss" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;
  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }
  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;
      & > div {
        float: left;
      }
      .cart-th1 {
        width: 25%;
        input {
          vertical-align: middle;
        }
        span {
          vertical-align: middle;
        }
      }
      .cart-th2 {
        width: 25%;
      }
      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }
    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;
      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;
        & > li {
          float: left;
        }
        .cart-list-con1 {
          width: 15%;
        }
        .cart-list-con2 {
          width: 35%;
          img {
            width: 82px;
            height: 82px;
            float: left;
          }
          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }
        .cart-list-con4 {
          width: 10%;
        }
        .cart-list-con5 {
          width: 17%;
          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
            text-decoration: none;
          }
          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 31px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
            text-decoration: none;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            cursor: pointer;
            color: #666;
          }
        }
      }
    }
  }
  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;
        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
          text-decoration: none;
          &hover {
            color: white !important;
          }
        }
      }
    }
  }
}
</style>
