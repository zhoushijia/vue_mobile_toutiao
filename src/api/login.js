/*
  登录请求
*/
import request from '@/utils/request'

// 登录
export const login = data =>
  request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })

// 短信验证码
export const sendSms = mobile =>
  request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
