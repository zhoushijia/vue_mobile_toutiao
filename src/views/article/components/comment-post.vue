<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button class="post-btn" :disabled="!message" @click="postComment"
      >发布</van-button
    >
  </div>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  name: 'CommentPost',
  components: {},
  props: {
    targetId: {
      type: [Number, String, Object],
      required: true
    },
    artId: {
      type: [Number, String, Object],
      default: () => null
    }
  },
  data() {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 发布评论
    async postComment() {
      this.$toast.loading({
        message: '发布中',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 一直持续
      })

      try {
        const {
          data: { data }
        } = await addComment({
          target: this.targetId, // 目标id
          content: this.message, // 评论内容
          art_id: this.artId // 文章id
        })
        // 发布内容传给父组件
        this.$emit('update-comment', data.new_obj)
        // 清空弹框内容
        this.message = ''
        this.$toast.success('发布成功')
      } catch (err) {
        this.$toast.fail('评论失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
