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
    url: `/app/v1_0/articles/${articleId}`
  })
