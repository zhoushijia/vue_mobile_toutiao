<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <comment-item
        v-for="(comment, index) in list"
        :key="index"
        :comment="comment"
      />
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
    artId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: null,
      limit: 15
    }
  },
  created() {
    this.onLoad()
  },
  methods: {
    async onLoad() {
      // 异步更新数据
      try {
        const {
          data: { data }
        } = await getComments({
          type: 'a', // a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.artId, // 文章id或评论id
          offset: this.offset, // 获取评论数据的偏移量，值为评论id
          limit: this.limit // 评论数据个数
        })
        console.log(data)
        // 添加数据
        this.list.push(...data.results)
        this.$emit('update-comment-total', data.total_count)
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (data.results.length) {
          // last_id
        } else {
          this.finished = true
        }
      } catch (err) {}
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
