<template>
  <div class="search-results">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="加载失败，请点击重试"
    >
      <van-cell
        v-for="(article, index) in list"
        :key="index"
        :title="article.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from '@/api/search'
export default {
  name: 'SearchResults',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,
      page: 1,
      per_page: 15
    }
  },
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      // 异步更新数据
      try {
        // 发请求
        const {
          data: { data }
        } = await getSearchResults({
          page: this.page,
          per_page: this.per_page,
          q: this.searchText
        })
        console.log(data)
        // 存数据
        this.list.push(...data.results)
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (data.results.length) {
          this.page++
        } else {
          // 数据全部加载完成
          this.finished = true
        }
      } catch (err) {
        // 数据请求错误
        this.error = true
        // 关闭加载图标
        this.loading = false
      }
    }
  },
  computed: {},
  watch: {}
}
</script>

<style lang="less" scoped></style>
