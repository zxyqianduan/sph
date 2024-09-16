<template>
  <div class="trade-container">
    <h3 class="title">填写并核对订单信息</h3>
    <!-- 收货地址信息 -->
    <div class="content">
      <h5 class="receive">收件人信息</h5>
      <div class="address clearFix" v-for="item in addressList" :key="item.id">
        <span class="username selected">{{ item.consignee }}</span>
        <p @click="DefaultAddress(item, item.id)">
          <span class="s1">{{ item.userAddress }}</span>
          <span class="s2">{{ item.phoneNum }}</span>
          <span class="s3" v-if="item.isDefault === '1'">默认地址</span>
        </p>
      </div>
      <div class="line"></div>
      <h5 class="pay">支付方式</h5>
      <div class="address clearFix">
        <span class="username selected">在线支付</span>
        <span class="username" style="margin-left: 5px">货到付款</span>
      </div>
      <div class="line"></div>
      <div class="detail">
        <h5>商品清单</h5>
        <ul
          class="list clearFix"
          v-for="trade in tradeDataList.detailArrayList"
          :key="trade.skuId"
        >
          <li>
            <img style="width: 82px; height: 82px" :src="trade.imgUrl" alt="" />
          </li>
          <li>
            <p>
              {{ trade.skuName }}
            </p>
            <h4>7天无理由退货</h4>
          </li>
          <li>
            <h3>￥{{ trade.orderPrice }}</h3>
          </li>
          <li>X{{ trade.skuNum }}</li>
          <li>有货</li>
        </ul>
      </div>
      <div class="bbs">
        <h5>买家留言：</h5>
        <textarea
          placeholder="建议留言前先与商家沟通确认"
          class="remarks-cont"
        ></textarea>
      </div>
      <div class="line"></div>
      <div class="bill">
        <h5>发票信息：</h5>
        <div>普通发票（电子） 个人 明细</div>
        <h5>使用优惠/抵用</h5>
      </div>
    </div>
    <div class="money clearFix">
      <ul>
        <li>
          <b
            ><i>{{ tradeskuNum }}</i
            >件商品，总商品金额</b
          >
          <span>¥{{ tradeprcie }}</span>
        </li>
        <li>
          <b>返现：</b>
          <span>0.00</span>
        </li>
        <li>
          <b>运费：</b>
          <span>0.00</span>
        </li>
      </ul>
    </div>
    <div class="trade">
      <div class="price">
        应付金额:　<span>¥{{ tradeprcie }}</span>
      </div>
      <div class="receiveInfo" v-if="RecipientInformation">
        寄送至:
        <span>{{ RecipientInformation.userAddress }}</span>
        收货人：<span>{{ RecipientInformation.consignee }}</span>
        <span>{{ RecipientInformation.phoneNum }}</span>
      </div>
    </div>
    <div class="sub clearFix">
      <a class="subBtn" @click="getpay">提交订单</a>
    </div>
  </div>
</template>

<script>
import { getTradeData, AddressList, MockAddressList, getsuborder } from "@/api/trade";

export default {
  name: "Trade",
  data() {
    return {
      tradeDataList: [], // 订单数据
      addressList: [], // 收获地址
      orderDetailList: [], // 订单详情
    };
  },
  methods: {
    // 获取订单数据和收货地址数据
    async getTradeList() {
      try {
        const tradeInfo = await getTradeData();
        const address = await AddressList();

        if (tradeInfo.code === 200 && address.code === 200) {
          const addressList = await MockAddressList();
          this.addressList = addressList.data;
          this.tradeDataList = tradeInfo.data;
          console.log(this.tradeDataList);
          
          this.tradeDataList.orderDetailVoList.forEach(item => {
            this.orderDetailList = item.orderDetailList
          })
          console.log(this.orderDetailList);
          this.getOrder()
        } else {
          throw new Error(res.message);
        }
      } catch (error) {
        console.log(error);
        this.$message({
          type: "error",
          message: error,
        });
      }
    },

    // 设置默认地址
    DefaultAddress(item, id) {
      this.addressList.forEach((item) => {
        item.isDefault = "0";
      });
      if (item.id === id) item.isDefault = "1";
    },
    getpay() {
      console.log(this.orderDetailList);
      this.$router.push({ name: "Pay" ,query:{
        orderId:'7069'
      }});
    },
    async getOrder(){
      const tradeNo = this.tradeDataList.tradeNo;
      console.log(tradeNo);
      
      const params = {
        consignee: '乔苒溪',
        consigneeTel:'18075376042',
        paymentWay: 'ONLINE',
        orderComment: '2222222222',
        orderDetailList: this.orderDetailList
      }
      console.log(params);
      
    const res = await getsuborder(tradeNo,params)
    console.log(res);
    
    if(res.code === 200){
      console.log(res);
    }
    }
  },
  mounted() {
    this.getTradeList();
  },
  computed: {
    // 寄送地址
    RecipientInformation() {
      return this.addressList.find((item) => item.isDefault === "1");
    },
    // 订单商品总数量
    tradeskuNum() {
      return this.tradeDataList.detailArrayList?.reduce((pre, cur) => {
        return pre + cur.skuNum;
      }, 0);
    },
    // 订单商品总价
    tradeprcie() {
      return this.tradeDataList.detailArrayList?.reduce((pre, cur) => {
        return pre + cur.orderPrice * cur.skuNum;
      }, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
.trade-container {
  .title {
    width: 1200px;
    margin: 0 auto;
    font-size: 14px;
    line-height: 21px;
  }

  .content {
    width: 1200px;
    margin: 10px auto 0;
    border: 1px solid rgb(221, 221, 221);
    padding: 25px;
    box-sizing: border-box;

    .receive,
    .pay {
      line-height: 36px;
      margin: 18px 0;
    }

    .address {
      padding-left: 20px;
      margin-bottom: 15px;

      .username {
        float: left;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: 1px solid #ddd;
        position: relative;
      }

      .username::after {
        content: "";
        display: none;
        width: 13px;
        height: 13px;
        position: absolute;
        right: 0;
        bottom: 0;
        background: url(./images/choosed.png) no-repeat;
      }

      .username.selected {
        border-color: #e1251b;
      }

      .username.selected::after {
        display: block;
      }

      p {
        width: 610px;
        float: left;
        line-height: 30px;
        margin-left: 10px;
        padding-left: 5px;
        cursor: pointer;

        .s1 {
          float: left;
        }

        .s2 {
          float: left;
          margin: 0 5px;
        }

        .s3 {
          float: left;
          width: 56px;
          height: 24px;
          line-height: 24px;
          margin-left: 10px;
          background-color: #f31414;
          color: #fff;
          margin-top: 3px;
          text-align: center;
        }
      }

      p:hover {
        background-color: #ddd;
      }
    }

    .line {
      height: 1px;
      background-color: #ddd;
    }

    .way {
      width: 1080px;
      height: 110px;
      background: #f4f4f4;
      padding: 15px;
      margin: 0 auto;

      h5 {
        line-height: 50px;
      }

      .info {
        margin-top: 20px;

        .s1 {
          float: left;
          border: 1px solid #ddd;
          width: 120px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          margin-right: 10px;
        }

        p {
          line-height: 30px;
        }
      }
    }

    .detail {
      width: 1080px;

      background: #feedef;
      padding: 15px;
      margin: 2px auto 0;

      h5 {
        line-height: 50px;
      }

      .list {
        display: flex;
        justify-content: space-between;

        li {
          line-height: 30px;

          p {
            margin-bottom: 20px;
          }

          h4 {
            color: #c81623;
            font-weight: 400;
          }

          h3 {
            color: #e12228;
          }
        }
      }
    }

    .bbs {
      margin-bottom: 15px;

      h5 {
        line-height: 50px;
      }

      textarea {
        width: 100%;
        border-color: #e4e2e2;
        line-height: 1.8;
        outline: none;
        resize: none;
      }
    }

    .bill {
      h5 {
        line-height: 50px;
      }

      div {
        padding-left: 15px;
      }
    }
  }

  .money {
    width: 1200px;
    margin: 20px auto;

    ul {
      width: 220px;
      float: right;

      li {
        line-height: 30px;
        display: flex;
        justify-content: space-between;

        i {
          color: red;
        }
      }
    }
  }

  .trade {
    box-sizing: border-box;
    width: 1200px;
    padding: 10px;
    margin: 10px auto;
    text-align: right;
    background-color: #f4f4f4;
    border: 1px solid #ddd;

    div {
      line-height: 30px;
    }

    .price span {
      color: #e12228;
      font-weight: 700;
      font-size: 14px;
    }

    .receiveInfo {
      color: #340303;
    }
  }

  .sub {
    width: 1200px;
    margin: 0 auto 10px;

    .subBtn {
      float: right;
      width: 164px;
      height: 56px;
      font: 700 18px "微软雅黑";
      line-height: 56px;
      text-align: center;
      color: #fff;
      background-color: #e1251b;
    }
  }
}
</style>
