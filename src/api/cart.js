import request from "@/utils"


/**
 * @description 获取购物车列表
 * @returns {Promise}
 */
export const getCartList = () => {
  return request.get('/api/cart/cartList')
}


/**
 * @description 切换商品选中状态
 * @param {string} skuID 商品ID
 * @param {string} isChecked  商品选中状态 0 代表取消选中 1 代表选中
 * @returns 
 */
export const setchecked = (skuID, isChecked) => {
  return request.get(`/api/cart/checkCart/${skuID}/${isChecked}`)
}

/**
 * @description 购物车商品全选
 * @param {string} isChecked  最新的状态 0 取消选中 1代表选中
 * @param {Array} skuIdList 请求体参数 代表修改的商品id (skuId)列表 
 * @returns 
 */
export const SelectListAll = (isChecked,skuidList) => {
  return request.post(`/api/cart/batchCheckCart/${isChecked}`,skuidList)
}


/**
 * @description 删除购物车单个商品
 * @param {string} skuId 商品ID
 * @returns 
 */
export const deletedCart = (skuId) => {
  return request.delete(`/api/cart/deleteCart/${skuId}`)
}

/**
 * @description 删除购物车所有商品
 * @returns 
 */
export const deleteAll = () => {
  return request.get('/api/cart/clearCart')
}