import Mock from 'mockjs'
import swiper from '@/Mock/swiper.json'
import floor from '@/Mock/floor.json'
import spuData from '@/Mock/spuSale.json'
import addressList from '@/Mock/address.json'

// mock模拟数据，mock是一个js文件不是vue插件不需要use使用
// 参数一：请求地址
// 参数二：请求方式
// 参数三：返回数据

// 模拟轮播图数据
Mock.mock('http://www.test.com/swiper', 'get', swiper)

// 模拟楼层数据
Mock.mock('http://www.test.com/floor', 'get', floor)

// 模拟spu数据
Mock.mock('http://www.test.com/spuData', 'get', spuData)

// 模拟地址数据
Mock.mock('http://www.test.com/address', 'get',()=>{
  return {
    data:addressList
  }
})
