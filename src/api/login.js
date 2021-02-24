import request from '@/utils/request'

export const login = data =>
  request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
