<template>
  <div class="reply-comment">
    <van-nav-bar :title="`${comment.reply_count}条回复`" @click-left="$emit('close-reply-popup')">
      <template #left>
        <van-icon name="cross" size="18" />
      </template>
    </van-nav-bar>
    <div class="reply-fixed-scroll">
      <!-- 被选中评论 -->
      <comment-item :comment="comment" />
      <!-- 被选中评论 -->

      <!-- 标题 -->
      <van-cell title="全部回复" />
      <!-- 评论列表 -->
      <article-comment :list="replyList" :aId="comment.com_id" type="c" />
    </div>

    <div class="reply-bottom">
      <van-button class="reply-btn" size="mini" round type="default" @click="isReplyShow = true">写评论</van-button>
    </div>
    <!-- 回复弹出层 -->
    <van-popup v-model="isReplyShow" position="bottom">
      <comment-post :targetId="comment.com_id" @update-comment="commentPostPupupClose" />
    </van-popup>
  </div>
</template>

<script>
import ArticleComment from './article-comment.vue'
import CommentItem from './comment-item'
import CommentPost from './comment-post'
export default {
  name: 'CommentReply',
  components: { CommentItem, ArticleComment, CommentPost },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isReplyShow: false,
      replyList: [] // 回复评论的清单
    }
  },
  created() {},
  mounted() {},
  methods: {
    commentPostPupupClose(data) {
      this.comment.reply_count++
      // 关闭弹出层
      this.isReplyShow = false
      // 回复评论添加到清单
      this.replyList.unshift(data)
    }
  },
  computed: {},
  watch: {}
}
</script>

<style lang="less" scoped>
.reply-fixed-scroll {
  position: fixed;
  top: 92px;
  bottom: 88px;
  left: 0;
  right: 0;
  overflow-y: auto;
}
.reply-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 88px;
  border-top: 1px solid #d8d8d8;
  .reply-btn {
    width: 50%;
  }
}
</style>
