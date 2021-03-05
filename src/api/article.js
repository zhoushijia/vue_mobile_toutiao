/* 文章相关的请求 */
import request from '@/utils/request'

// 获取频道文章列表
export const getArticle = params =>
  request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })

// 获取文章详情
export const getArticleDetails = articleId =>
  request({
    method: 'GET',
    // 这里 articleId 对象在字符串拼接的时候自动调用toString方法转换成字符串
    url: `/app/v1_0/articles/${articleId}`
  })

// 关注
export const isFollowed = autId =>
  request({
    method: 'POST',
    // 这里 articleId 对象在字符串拼接的时候自动调用toString方法转换成字符串
    url: '/app/v1_0/user/followings',
    data: {
      target: autId
    }
  })

// 取消关注
export const isUnfollowed = autId =>
  request({
    method: 'DELETE',
    // 这里 articleId 对象在字符串拼接的时候自动调用toString方法转换成字符串
    url: `/app/v1_0/user/followings/${autId}`
  })

// 收藏文章
export const addCollect = artId =>
  request({
    method: 'POST',
    // 这里 articleId 对象在字符串拼接的时候自动调用toString方法转换成字符串
    url: '/app/v1_0/article/collections',
    data: { target: artId }
  })

// 取消关注
export const deleteCollect = artId =>
  request({
    method: 'DELETE',
    // 这里 articleId 对象在字符串拼接的时候自动调用toString方法转换成字符串
    url: `/app/v1_0/article/collections/${artId}`
  })

// 点赞
export const addLike = artId =>
  request({
    method: 'POST',
    // 这里 articleId 对象在字符串拼接的时候自动调用toString方法转换成字符串
    url: '/app/v1_0/article/likings',
    data: { target: artId }
  })

// 取消点赞
export const deleteLike = artId =>
  request({
    method: 'DELETE',
    // 这里 articleId 对象在字符串拼接的时候自动调用toString方法转换成字符串
    url: `/app/v1_0/article/likings/${artId}`
  })
