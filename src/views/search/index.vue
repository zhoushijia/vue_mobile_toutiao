<template>
  <div class="search">
    <!-- Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
    <form action="/">
      <van-search
        class="search-input"
        v-model="searchText"
        background="#3296fa"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultsShow = false"
      />
    </form>
    <!-- 搜索结果 -->
    <search-results v-if="isResultsShow"></search-results>
    <!-- 搜索联想建议 -->
    <!-- 联想建议的请求可以在父组件执行  也可以在子组件中进行 子组件进行更能实现分离的思想 -->
    <search-suggestion
      v-else-if="searchText"
      :searchText="searchText"
    ></search-suggestion>
    <!-- 搜索历史 -->
    <search-history v-else></search-history>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory'
import SearchSuggestion from './components/SearchSuggestion'
import SearchResults from './components/SearchResults'
export default {
  name: 'Search',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResults
  },
  data() {
    return {
      searchText: '',
      isResultsShow: false // 是否显示搜索结果的条件
    }
  },
  created() {},
  mounted() {},
  methods: {
    onSearch(val) {
      this.isResultsShow = true
      console.log(val)
    },
    onCancel() {
      this.$router.push(this.$route.query.redirect || '/')
    }
  },
  computed: {},
  watch: {}
}
</script>

<style lang="less" scoped>
.van-search__action {
  color: #fff;
  &:active {
    background-color: #3296fa;
  }
}
</style>
