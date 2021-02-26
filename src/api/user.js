/*
  登录请求
*/
import request from '@/utils/request'
// import store from '@/store'

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

// 获取用户信息
export const getUserinfo = () =>
  request({
    method: 'GET',
    url: '/app/v1_0/user'
    // headers: {
    //   // 注意：该接口需要授权才能访问
    //   //       token的数据格式：Bearer token数据，注意 Bearer 后面有个空格
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
