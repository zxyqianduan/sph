import request from '@/utils'

/**
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
