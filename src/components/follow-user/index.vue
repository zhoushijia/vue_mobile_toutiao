<template>
  <van-button class="follow-btn" type="info" color="#3296fa" round :loading="loading" size="small" icon="plus" v-if="!isFollowed" @click="onFollowClick">关注</van-button>
  <van-button v-else class="follow-btn" round :loading="loading" size="small" @click="onFollowClick">取消关注</van-button>
</template>

<script>
import { isFollowed, isUnfollowed } from '@/api/article'
export default {
  name: 'FollowUser',
  model: {
    prop: 'isFollowed',
    event: 'update-is_followed'
  },
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    autId: {
      type: [Number, String, Object],
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
    async onFollowClick() {
      // 关注按钮 加载
      this.loading = true
      try {
        if (this.isFollowed) {
          // 关注情况下
          await isUnfollowed(this.autId)
        } else {
          // 非关注情况下
          await isFollowed(this.autId)
        }
        this.$emit('update-is_followed', !this.isFollowed)
      } catch (err) {
        if (err.response && err.response.status === 400) {
          this.loading = false
          return this.$toast.fail('不能关注自己')
        }
        this.$toast.fail('操作失败')
      }
      this.loading = false
    }
  },
  computed: {},
  watch: {}
}
</script>

<style lang="less" scoped></style>
