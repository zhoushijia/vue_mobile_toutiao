<template>
  <van-icon
    :name="isLike === 1 ? 'good-job' : 'good-job-o'"
    :class="{ 'add-like-success': isLike === 1 }"
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
      required: true
    },
    artId: {
      type: [String, Boolean, Object],
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
      this.isLike = -1
      try {
        if (this.isLike) {
          await deleteLike(this.artId)
        } else {
          await addLike(this.artId)
          this.isLike = 1
        }
        this.$emit('update-is_colleted', this.isLike)
        this.$toast(this.isLike === 1 ? '点赞成功' : '取消点赞')
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

<style lang="less" scoped>
.add-like-success {
  color: skyblue;
}
</style>
