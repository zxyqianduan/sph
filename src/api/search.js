import request from '@/utils'


/**
 * 
 * @inheritDoc https://www.showdoc.com.cn/2077491945864902/9419696081183301
 * @description 获取搜索列表
 * @param params 请求参数
 * @returns 搜索列表数据
 */
export const getSearchList = (params) => {
  return request({
    url: '/api/list',
    method: 'post',
    data: params
  })
  // return request.post('/api/list', params)
}
