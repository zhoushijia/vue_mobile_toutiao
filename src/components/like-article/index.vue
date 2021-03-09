<template>
  <van-icon
    :name="isLike === 1 ? 'good-job' : 'good-job-o'"
    :color="isLike === 1 ? 'red' : '#777'"
    @click="isLikeClick"
  />
</template>

<script>
import { deleteLike, addLike } from '@/api/article'
export default {
  name: 'LikeArticle',
  model: {
    prop: 'isLike',
    event: 'update-is_like'
  },
  props: {
    isLike: {
      type: [Number, String],
      default: -1
    },
    artId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  created() {},
  mounted() {},
  methods: {
    async isLikeClick() {
      // this.loading = true
      this.$toast({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      let flag = -1
      try {
        if (this.isLike === 1) {
          await deleteLike(this.artId)
        } else {
          await addLike(this.artId)
          // ! 这种写法是错误的  子组件不能修改父组件传来的值
          // this.isLike=1
          flag = 1
        }
        this.$emit('update-is_colleted', flag)
        this.$toast(flag === 1 ? '点赞成功' : '取消点赞')
      } catch (err) {
        this.$toast.fail('点赞操作失败')
      }
      // this.loading = false
    }
  },
  computed: {},
  watch: {}
}
</script>

<style lang="less" scoped></style>
