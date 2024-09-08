import request from '@/utils/index'
import MockRequest from '@/utils/mockRequest'

/**
 * 获取商品详情
 * @param skuId 商品ID
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const getDetail = (skuId) => {
  return request.get(`/api/item/${skuId}`)
}

/**
 * 获取商品颜色版本
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const getSpudata = () => {
  return MockRequest.get('/spuData')
}



/**
 * @description 添加商品到购物车
 * @param {*} skuId  商品ID
 * @param {*} skuNum 购买数量
 * @returns 
 */
export const reqAddToCart = (skuId, skuNum) => {
  return request.get(`/api/cart/addToCart/${skuId}/${skuNum}`)
}
