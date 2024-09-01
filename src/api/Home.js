import request from '@/utils'
import mockRequest from '@/utils/mockRequest'

/**
 * @inheritDoc https://www.showdoc.com.cn/2077491945864902/9418264885837264
 * @description 获取首页三级分类
 * @returns Promise
 */
export const reqCategoryList = () => {
  return request.get('/api/product/getBaseCategoryList')
  // return request({
  //   url: '/api/product/getBaseCategoryList',
  //   method: 'get'
  // })
}

/**
 * @inheritdoc mock模拟数据
 * @description 获取轮播图数据
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const getSwiperData = () => {
  return mockRequest.get('/swiper')
}

/**
 * @inheritdoc mock模拟数据
 * @description 获取楼层数据
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const getfloorData = () => {
  return mockRequest.get('/floor')
}
