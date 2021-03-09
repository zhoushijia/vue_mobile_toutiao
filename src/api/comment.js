/* 评论 */
import request from '../utils/request'

// 获取评论
export const getComments = params =>
  request({
    method: 'GET',
    url: '/v1_0/comments',
    params
  })

// 点赞
export const addLike = comId =>
  request({
    method: 'POST',
    // 这里 articleId 对象在字符串拼接的时候自动调用toString方法转换成字符串
    url: '/v1_0/comment/likings',
    data: { target: comId }
  })

// 取消点赞
export const deleteLike = comId =>
  request({
    method: 'DELETE',
    // 这里 articleId 对象在字符串拼接的时候自动调用toString方法转换成字符串
    url: `/v1_0/comment/likings/${comId}`
  })

// 发布评论
export const addComment = data =>
  request({
    method: 'POST',
    // 这里 articleId 对象在字符串拼接的时候自动调用toString方法转换成字符串
    url: '/v1_0/comments',
    data
  })
