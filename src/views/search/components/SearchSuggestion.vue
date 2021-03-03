<template>
  <div class="search-suggestion">
    <van-cell v-for="(text, index) in suggestions" :key="index" icon="search">
      <!-- #2 搜索文字高亮 -->
      <span slot="title" v-html="highlight(text)"></span>
    </van-cell>
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
    // 发起请求,获取联想建议
    async loadSearchSuggestions(val) {
      try {
        const {
          data: { data }
        } = await getSearchSuggestions(val)
        this.suggestions = data.options
      } catch (error) {
        this.$toast('联想建议获取失败')
      }
    },
    // 搜索文字高亮
    highlight(text) {
      // 变量设置为正则规则
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, `<span class="active">${this.searchText}</span>`)
      // 或者
      /* return text.replace(
        // eval 把一个字符串当作一个JavaScript表达式一样去执行
        eval('/' + this.searchText + '/gi'),
        `<span class="active">${this.searchText}</span>`
      ) */
    }
  },
  computed: {},
  watch: {
    // #1 监听器的完整写法
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

<style lang="less" scoped>
.search-suggestion {
  /deep/ span.active {
    color: #5babfb;
  }
}
</style>
