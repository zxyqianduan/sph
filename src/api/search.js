import request from '@/utils'

export const getSearchList = (params) => {
  return request({
    url: '/api/list',
    method: 'post',
    data: params
  })
  // return request.post('/api/list', params)
}
