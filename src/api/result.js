import request from '@/utils/request'
export const getSearchResult = (q, page) => {
  return request({
    url: '/v1_0/search',
    params: {
      q,
      page
    }
  })
}
