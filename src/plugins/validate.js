import Vue from 'vue'
// 导入汉化语言包
import zh from 'vee-validate/dist/locale/zh_CN'
import VeeValidate, { Validator } from 'vee-validate'
const phone =
  /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
// 验证码正则
const codeReg = /^\d{6}$/
// 密码正则
const pwdReg = /^\w{6,21}$/

Vue.use(VeeValidate)
// 调用localize方法使用汉化语言包实现汉化
Validator.localize('zh', zh)

// ****** 注意：自定义的规则要放在Validator方法之后，Validator可能会影响自定义规则

// 实现自定义验证手机号规则
// 第一个参数，是规则名字
Validator.extend('phone', {
  // getMessage方法抛出错误的提示
  // 用户输入的值验证没有通过，就会执行getMessage，返回错误信息
  // field 就是哪个表单，表单的name属性值
  getMessage (field, params, data) {
    console.log(field)
    return '手机号格式不对，请重新输入'
  },
  // validate 方法用来实现对表单的验证，验证的逻辑需要在validate中定义
  // value是表单元素的值
  validate (value) {
    return phone.test(value)
  }
})

// 验证码的验证规则
Validator.extend('code', {
  validate: (value) => codeReg.test(value), // 验证规则
  getMessage: (filed) => '验证码必须为6位数字！' // 验证失败的回调
})

// 密码的验证规则
Validator.extend('pwd', {
  validate: (value) => pwdReg.test(value), // 验证规则
  getMessage: (filed) => '密码为6到21位英文、数字、下划线' // 验证失败的回调
})

// 重复密码的验证规则
Validator.extend('确认密码', {
  validate: (value, args) => value === args[0], // 验证规则
  getMessage: (filed) => '重复密码必须和登录密码一致' // 验证失败的回调
})

// 协议规则
Validator.extend('isagree', {
  validate: (value) => value, // 验证规则
  getMessage: (filed) => '协议必须同意！' // 验证失败的回调
})
