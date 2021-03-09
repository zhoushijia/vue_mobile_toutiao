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

/* 获取用户个人资料 */
export const getUserProfile = () =>
  request({
    method: 'GET',
    url: '/app/v1_0/user/profile'
  })

// 编辑用户个人资料
export const editUserProfile = data =>
  request({
    method: 'PATCH',
    url: '/app/v1_0/user/profile',
    data
  })

export const updatePhoto = data =>
  request({
    method: 'PATCH',
    url: '/app/v1_0/user/photo',
    data
  })
