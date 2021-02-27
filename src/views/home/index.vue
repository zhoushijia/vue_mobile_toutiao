<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        >搜索</van-button
      >
    </van-nav-bar>

    <!-- 频道列表 -->
    <van-tabs
      class="channel-tabs"
      v-model="activeName"
      animated
      swipeable
      swipe-threshold="3"
    >
      <van-tab
        v-for="channel in userChannel"
        :key="channel.id"
        :title="channel.name"
      >
        <articles-list :channel="channel"></articles-list>
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
  </div>
</template>

<script>
import { getChannel } from '@/api/user'
import ArticlesList from './components/Articles-list.vue'
export default {
  name: 'HomeIndex',
  data() {
    return {
      activeName: 0,
      // 频道数据
      userChannel: []
    }
  },
  created() {
    this.getUserChannel()
  },
  methods: {
    // #1 个人频道列表获取
    // 这里即使没有传入 token 仍然可以获取公用的频道列表
    async getUserChannel() {
      try {
        // const { data: res } = await getChannel()
        // this.userChannel = res.data.channels
        // 多层对象解构获取数据
        const {
          data: {
            data: { channels }
          }
        } = await getChannel()
        this.userChannel = channels
      } catch (error) {
        this.$toast('个人频道获取失败')
      }
    }
  },
  components: {
    ArticlesList
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding-top: 180px;
  padding-bottom: 100px;
  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
  /deep/ .channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      // 这条属性必须加 不然会被覆盖
      z-index: 1;
      // 保证可以 左右滑动 否则不能滑动
      width: 100%;
      // left: 0;
      // right: 0;
    }
    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      height: 80px;
      .van-tab__text {
        font-size: 27px;
        color: #777777;
      }
    }

    .van-tab--active .van-tab__text {
      color: #333 !important;
    }
    .van-tabs__line {
      width: 31px !important;
      height: 6px;
      background: rgba(50, 150, 250, 1);
      border-radius: 3px;
      bottom: 8px;
    }
    .van-tabs__nav {
      padding: 0;
    }
    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.902;
      i.toutiao {
        font-size: 33px;
      }
      &:before {
        content: '';
        position: absolute;
        left: 0;
        width: 1px;
        height: 100%;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>
