<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" left-arrow title="黑马头条"></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="articleInfo.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ articleInfo.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="articleInfo.aut_photo"
          />
          <div slot="title" class="user-name">{{ articleInfo.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ articleInfo.pubdate | relativeTime }}
          </div>
          <!-- <van-button
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            :loading="followedLoading"
            size="small"
            icon="plus"
            v-if="!articleInfo.is_followed"
            @click="onFollowClick"
            >关注</van-button
          >
          <van-button
            v-else
            class="follow-btn"
            round
            :loading="followedLoading"
            size="small"
            @click="onFollowClick"
            >取消关注</van-button
          > -->
          <!-- 数据绑定和事件监听实现数据双向绑定 -->
          <!-- <follow-user
            :isFollowed="articleInfo.is_followed"
            :autId="articleInfo.aut_id"
            @update-is_followed="articleInfo.is_followed = $event"
          ></follow-user> -->
          <!-- 组件v-model -->
          <follow-user
            v-model="articleInfo.is_followed"
            :autId="articleInfo.aut_id"
            @update-is_followed="articleInfo.is_followed = $event"
          ></follow-user>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          ref="article-content"
          v-html="articleInfo.content"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 文章内容 -->

        <!-- 评论列表 -->
        <article-comment
          :list="commentList"
          :artId="articleInfo.art_id"
          @update-comment-total="commentTotalCount = $event"
        />
        <!-- 评论列表 -->

        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="isCommentPostShow = true"
            >写评论</van-button
          >
          <van-icon name="comment-o" :badge="commentTotalCount" color="#777" />
          <collect-article
            v-model="articleInfo.is_collected"
            :artId="articleInfo.art_id"
            @update-is_colleted="articleInfo.is_collected = $event"
          />
          <like-article
            v-model="articleInfo.attitude"
            :artId="articleInfo.art_id"
            @update-is_like="articleInfo.attitude = $event"
          />
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticleDetails"
          >点击重试</van-button
        >
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->

      <!-- 发布评论 -->
      <van-popup v-model="isCommentPostShow" position="bottom">
        <comment-post
          :artId="articleInfo.art_id"
          @update-comment="commentPostPupupClose"
        />
      </van-popup>
      <!-- 发布评论 -->
    </div>
  </div>
</template>

<script>
import { getArticleDetails } from '@/api/article'
// vant 的 ImagePreview 相当于一个方法
import { ImagePreview } from 'vant'
import FollowUser from '@/components/follow-user'
import CollectArticle from '@/components/collect-article'
import LikeArticle from '@/components/like-article'
import ArticleComment from './components/article-comment.vue'
import CommentPost from './components/comment-post.vue'

export default {
  name: 'ArticleIndex',
  components: {
    FollowUser,
    CollectArticle,
    LikeArticle,
    ArticleComment,
    CommentPost
  },
  props: {
    // ! 解耦 保证不止路由跳转 增加了组件的复用性
    articleId: {
      // ? 1.通过url过来的时字符串,2.通过路由跳转的是数字,3.bigint转换后是对象
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      articleInfo: {},
      loading: true, // 加载状态显示条件
      errStatus: 0, // 资源是否找到
      // followedLoading: false // 点击关注按钮后的加载状态
      commentTotalCount: 0, // 评论总数
      isCommentPostShow: false,
      commentList: []
    }
  },
  computed: {},
  watch: {},
  created() {
    this.loadArticleDetails()
  },
  mounted() {},
  methods: {
    // #1 获取文章详情
    async loadArticleDetails() {
      // 开始时 显示加载状态
      this.loading = true
      try {
        // console.log(this.articleId)
        // ! 大数字问题 axios会自动JSON.parse转化
        const {
          data: { data }
        } = await getArticleDetails(this.articleId)

        // 模拟非404请求错误
        /* if (Math.random() > 0.8) {
          JSON.parse('aaaaaa')
        } */
        // console.log(data)
        this.articleInfo = data

        // ! 关闭加载，使文章信息渲染后才能拿到元素节点
        // 简单粗暴的方法一
        // setTimeout(this.imgPreview, 0)
        // 或者 推荐方法二
        this.loading = false
        this.$nextTick(this.imgPreview)
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errStatus = 404
        }
      }
      // 结束关闭加载状态
      this.loading = false
    },
    // ! 图片预览
    imgPreview() {
      // 拿到article-content标签 并且 拿到其中的imgDom标签
      const oImgs = this.$refs['article-content'].querySelectorAll('img')
      const images = []
      // 遍历imgDom
      oImgs.forEach((img, index) => {
        images.push(img.src)
        // 给每个imgDom注册点击事件
        img.onclick = function() {
          ImagePreview({
            images,
            startPosition: index
          })
        }
      })
    },
    // 评论发布框
    // 评论关闭
    commentPostPupupClose(data) {
      // 关闭弹框
      this.isCommentPostShow = false
      // 新发表的评论添加到评论列表头部
      this.commentList.unshift(data)
    }
    // 关注与取关
    /*  async onFollowClick() {
      this.followedLoading = true
      try {
        console.log(233)
        if (this.articleInfo.is_followed) {
          await isUnfollowed(this.articleInfo.aut_id)
          console.log(111)
        } else {
          await isFollowed(this.articleInfo.aut_id)
          console.log(222)
        }
        this.articleInfo.is_followed = !this.articleInfo.is_followed
        console.log(this.articleInfo.is_followed)
      } catch (err) {
        this.$toast('关注相关操作失败')
        console.log(err)
      }
      this.followedLoading = false
    } */
  }
}
</script>

<style scoped lang="less">
@import './github-markdown.css';

.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
