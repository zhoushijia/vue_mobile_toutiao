<template>
  <van-icon :name="isCollected ? 'star' : 'star-o'" :color="isCollected ? '#ffa500' : '#777'" @click="isCollectClick" />
</template>

<script>
import { deleteCollect, addCollect } from '@/api/article'
export default {
  name: 'CollectArticle',
  model: {
    prop: 'isCollected',
    event: 'update-is_colleted'
  },
  props: {
    isCollected: {
      type: Boolean,
      required: true
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
    async isCollectClick() {
      // this.loading = true
      this.$toast({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        if (this.isCollected) {
          await deleteCollect(this.artId)
        } else {
          await addCollect(this.artId)
        }
        this.$emit('update-is_colleted', !this.isCollected)
        this.$nextTick(() =>
          this.$toast(this.isCollected ? '收藏成功' : '取消收藏')
        )
      } catch (err) {
        this.$toast.fail('收藏操作失败')
      }
      // this.loading = false
    }
  },
  computed: {},
  watch: {}
}
</script>

<style lang="less" scoped></style>
