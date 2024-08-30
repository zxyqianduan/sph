import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const request = axios.create({
  baseURL: 'http://sph-h5-api.atguigu.cn/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 添加请求拦截器
request.interceptors.request.use((config) => {
  // 在发送请求之前做些什么
  NProgress.start()
  return config
}, (error) => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use((response) => {
  // 对响应数据做点什么
  NProgress.done()
  return response.data
}, (error) => {
  // 对响应错误做点什么
  return Promise.reject(error)

  // 如果不想每个接口自己处理错误，返回一个等待的promise状态，这样就可以统一处理错误
  // return new Promise(() => {})
})

export default request
