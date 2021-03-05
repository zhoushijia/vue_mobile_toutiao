<template>
  <van-icon color="#777" :name="isCollected ? 'star' : 'star-o'" :class="{}" />
</template>

<script>
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
    }
  },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {},
  computed: {},
  watch: {}
}
</script>

<style lang="less" scoped></style>
