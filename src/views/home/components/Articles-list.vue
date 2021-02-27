<template>
  <div>
    <!--
        loading 控制上拉加载更多的 loading 状态
        finished 控制数据是否加载结束
        load 事件：当触发上拉加载更多的时候会触发调用 load 事件

        List 初始化后会触发一次 load 事件，用于加载第一屏的数据
        如果一次请求加载的数据条数较少，导致列表内容无法铺满当前屏幕，List 会继续触发 load 事件，直到内容铺满屏幕或数据全部加载完成
      -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item.art_id" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getArticle } from '@/api/article.js'
export default {
  name: 'Articles-List',
  data() {
    return {
      list: [], // 存储list列表数据
      loading: false, // 上拉加载更多的 loading 状态
      finished: false, // 是否全部加载完毕
      timestamp: null // 请求下一页数据的时间戳
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
        // 把数据添加到 list 数组中
        this.list.push(...data.results)

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (data.results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (error) {
        console.log('未获取到文章列表数据', error)
      }
    }
  }
}
</script>

<style></style>
