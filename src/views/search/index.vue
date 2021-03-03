<template>
  <div class="search-container">
    <!-- Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
    <form class="search-form" action="/">
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
    <search-results
      v-if="isResultsShow"
      :searchText="searchText"
    ></search-results>
    <!-- 搜索联想建议 -->
    <!-- 联想建议的请求可以在父组件执行  也可以在子组件中进行 子组件进行更能实现分离的思想 -->
    <search-suggestion
      v-else-if="searchText"
      :searchText="searchText"
      @search="onSearch"
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
    // 两个事件触发onSearch 1.联想建议;2.回车/点击搜索
    onSearch(val) {
      // 当点击联想建议时，将对应的联想建议值传输过来
      this.searchText = val
      this.isResultsShow = true
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
.search-container {
  padding-top: 108px;
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
  }
  /deep/ .van-search__action {
    color: #fff;
    &:active {
      background-color: #3296fa;
    }
  }
}
</style>
