<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去 <router-link to="/login">登录</router-link>
        </span>
      </h3>

        <div class="content">
          <label>手机号:</label>
          <input v-validate="{phone: true,required:true}" type='text' name="phone" v-model="Phone" placeholder="请输入你的手机号" />
          <span class="error-msg">{{ errors.first('phone')}}</span>
        </div>
        <div class="content">
          <label>验证码:</label>
          <input v-validate="{code: true,required:true}" type="text" name="code" v-model="Code" placeholder="请输入验证码" />
          <button class="getcode" @click="sendCode">获取验证码</button>
          <span class="error-msg">{{errors.first('code')}}</span>
        </div>
        <div class="content">
          <label>登录密码:</label>
          <input
            v-validate="{pwd: true,required:true}"
            type="password"
            name="pwd"
            v-model="Password"
            placeholder="请输入你的登录密码"
          />
          <span class="error-msg">{{errors.first('pwd')}}</span>
        </div>
        <div class="content">
          <label>确认密码:</label>
          <input
            v-validate="{required:true,'确认密码':Password}"
            type="password"
            name="确认密码"
            v-model="ConfirmPassword"
            placeholder="请输入确认密码"
          />
          <span class="error-msg">{{errors.first('确认密码')}}</span>
        </div>
        <div class="controls">
          <input v-validate="{isagree: true,required:true}" v-model="isAgree" name="isagree" type="checkbox" />
          <span>同意协议并注册《尚品汇用户协议》</span>
          <span class="error-msg">{{errors.first('isagree')}}</span>
        </div>

      <div class="btn">
        <button @click="register">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
import { LgoinRegister, sendcode } from '@/api/login-register'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Register',
  data () {
    return {
      Phone: '', // 手机号
      Code: '', // 验证码
      Password: '', // 登录密码
      ConfirmPassword: '', // 确认密码
      isAgree: '' // 是否同意协议
    }
  },
  methods: {
    // 发送验证码
    async sendCode () {
      const res = await sendcode(this.Phone)
      if (res.code === 200) {
        this.Code = res.data
      }
    },
    // 注册账号
    async register () {
      const valide = await this.$validator.validateAll()
      console.log(valide)
      const params = {
        phone: this.Phone,
        code: this.Code,
        password: this.Password
      }
      if (valide) {
        const res = await LgoinRegister(params)
        if (res.code === 200) {
          this.$message({
            message: '注册账号成功',
            type: 'success'
          })
          await this.$router.push('/login')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }

    .getcode {
      height: 38px;
      margin-left: 10px;
      padding: 5px;
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>
