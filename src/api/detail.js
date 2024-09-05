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
