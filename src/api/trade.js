import request from "@/utils";
import mockRequest from "@/utils/mockRequest";

/**
 * @description 获取交易购买商品列表数据
 * @returns  {Promise}
 */
export const getTradeData = () => {
  return request.get("/api/order/auth/trade");
};

/**
 * @description 获取用户地址数据
 * @returns 后端没有返回数据，使用mock模拟
 */
export const AddressList = () => {
  return request.get("/api/user/userAddress/auth/findUserAddressList");
};

/**
 * @description 模拟用户地址数据
 * @returns
 */
export const MockAddressList = () => {
  return mockRequest.get("/address");
};

/**
 * @description 提交订单
 * @param {string} tradeNo 交易编号
 * @returns {Promise}
 */
export const getsuborder = (tradeNo, params) => {
  return request.post(`/api/order/auth/submitOrder?tradeNo=${tradeNo}`, params);
};
