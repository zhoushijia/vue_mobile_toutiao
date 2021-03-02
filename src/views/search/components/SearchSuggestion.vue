<template>
  <div class="search-suggestion">
    <van-cell
      :title="text"
      v-for="(text, index) in suggestions"
      :key="index"
      icon="search"
    />
  </div>
</template>

<script>
import { debounce } from 'lodash'
import { getSearchSuggestions } from '@/api/search'
export default {
  name: 'SearchSuggestion',
  data() {
    return {
      suggestions: []
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    async loadSearchSuggestions(val) {
      try {
        const {
          data: { data }
        } = await getSearchSuggestions(val)
        this.suggestions = data.options
      } catch (error) {
        this.$toast('联想建议获取失败')
      }
    }
  },
  computed: {},
  watch: {
    // 监听器的完整写法
    searchText: {
      // 优化：介绍发请求的次数。防抖
      handler: debounce(function(value) {
        // 发起请求
        this.loadSearchSuggestions(value)
      }, 300),
      // 该回调将会在侦听开始之后被立即调用
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped></style>
