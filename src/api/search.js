import request from '@/utils/request'

// 联想建议
export const getSearchSuggestions = q =>
  request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })

// 联想建议
export const getSearchResults = params =>
  request({
    method: 'GET',
    url: '/app/v1_0/search',
    params
  })
