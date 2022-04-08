<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :error.sync="error" error-text="请求失败，点击重新加载" @load="onLoad">
      <comment-item @reply-comment="$emit('reply-comment', $event)" v-for="(comment, index) in list" :key="index" :comment="comment" />
    </van-list>
    <!-- 评论列表 -->
  </div>
</template>

<script>
import { getComments } from '@/api/comment'
import CommentItem from './comment-item'
export default {
  name: 'ArticleComment',
  components: { CommentItem },
  props: {
    aId: {
      type: [Number, String, Object],
      required: true
    },
    // ! 假设是父组件传来的
    list: {
      type: Array,
      default: () => [] // 默认值必须写函数形式
    },
    type: {
      type: String,
      default: 'a',
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个
        return ['a', 'c'].includes(value)
      }
    }
  },
  data() {
    return {
      // list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      error: false,
      offset: null,
      limit: 15
    }
  },
  created() {
    // ! 解决 视图 空白导致手动和自动onLoad 同时触发
    this.loading = true
    this.onLoad()
  },
  methods: {
    async onLoad() {
      // 异步更新数据
      try {
        const {
          data: { data }
        } = await getComments({
          type: this.type, // a-对文章(article)的评论，c-对评论(comment)的回复
          // ! 这里手动toString 保证大数字id传输时不带引号
          source: this.aId.toString(), // 文章id或评论id
          offset: this.offset, // 获取评论数据的偏移量，值为评论id
          limit: this.limit // 评论数据个数
        })
        // console.log(data)
        // 添加数据
        this.list.push(...data.results)
        this.$emit('update-comment-total', data.total_count)
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (data.results.length) {
          this.offset = data.last_id
        } else {
          this.finished = true
        }
      } catch (err) {
        this.loading = false
        this.error = true
      }
    }
  }
}
</script>

<style scoped lang="less">
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>
