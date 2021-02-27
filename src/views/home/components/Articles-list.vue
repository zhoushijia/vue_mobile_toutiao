<template>
  <div class="articles-list">
    <!--
        loading 控制上拉加载更多的 loading 状态
        finished 控制数据是否加载结束
        load 事件：当触发上拉加载更多的时候会触发调用 load 事件

        List 初始化后会触发一次 load 事件，用于加载第一屏的数据
        如果一次请求加载的数据条数较少，导致列表内容无法铺满当前屏幕，List 会继续触发 load 事件，直到内容铺满屏幕或数据全部加载完成
      -->
    <van-pull-refresh
      v-model="isRefreshLoading"
      :success-text="isRefreshSuccessText"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <articles-item
          v-for="article in list"
          :key="article.art_id"
          :article="article"
        ></articles-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticle } from '@/api/article.js'
import ArticlesItem from '@/components/articles-item'
export default {
  name: 'Articles-List',
  components: {
    ArticlesItem
  },
  data() {
    return {
      list: [], // 存储list列表数据
      loading: false, // 上拉加载更多的 loading 状态
      finished: false, // 是否全部加载完毕
      timestamp: null, // 请求下一页数据的时间戳
      error: false, // 上拉刷新失败的标识
      isRefreshLoading: false, // 下拉刷新的 loading 状态
      isRefreshSuccessText: '刷新成功' // 下拉刷新完成后的状态提示文本
    }
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  methods: {
    // 当触发上拉加载更多的时候调用该函数
    async onLoad() {
      // 异步更新数据
      // 获取文章列表的请求
      try {
        const {
          data: { data }
        } = await getArticle({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(), // 请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
          with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })
        console.log(data)

        /*   // 模拟错误
        if (Math.random() > 0.5) {
          JSON.parse('aaaaaa')
        } */

        // 把数据添加到 list 数组中
        this.list.push(...data.results)
        console.log(this.list)
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        // 如果后端返回的数组长度为 0 了，表示数据已经全部加载
        if (data.results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        // 网络或其他原因导致请求失败
        this.error = true
        // 关闭loading
        this.loading = false
      }
    },
    // 下拉刷新
    async onRefresh() {
      // 发送请求 注意时间戳必须是最新的
      try {
        const {
          data: { data }
        } = await getArticle({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1
        })
        /* // 模拟错误
        if (Math.random() > 0.5) {
          JSON.parse('aaaaaa')
        } */
        // 往数组头部添加数据
        this.list.unshift(...data.results)
        // 加载状态
        this.isRefreshLoading = false
        // 提示文本
        this.isRefreshSuccessText = `刷新成功，更新了${data.results.length}条数据`
      } catch (err) {
        this.isRefreshLoading = false
        this.isRefreshSuccessText = '刷新失败'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.articles-list {
  height: 79vh;
  overflow: auto;
}
</style>
