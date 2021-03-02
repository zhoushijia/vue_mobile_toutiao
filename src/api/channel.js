/*
 频道相关请求
*/
import request from '@/utils/request'

// 获取所有频道
export const getAllChannels = () =>
  request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })

// 获取所有频道数据
export const getMyChannels = () =>
  request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })

// 添加频道到我的频道
export const saveChannel = channel =>
  request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data: {
      channels: [channel]
    }
  })

// 从我的频道删除频道
export const deleteChannel = channelId =>
  request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${channelId}`
  })
