<template>
  <div class="my-container">
    <!-- 已登录头部 -->
    <div v-if="user" class="login-header user-info">
      <div class="base-info">
        <div class="left">
          <van-image class="avatar" :src="userinfo.photo" round fit="cover" />
          <span class="name">{{ userinfo.name }}</span>
        </div>
        <div class="right">
          <van-button size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{ userinfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userinfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userinfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userinfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>

    <!-- 未登录头部 -->
    <div v-else class="login-header not-login">
      <div
        class="login-btn"
        @click="$router.push({ name: 'login', query: { redirect: '/my' } })"
      >
        <img src="~@/assets/mobile.png" alt="" class="login-img" />
        <span class="text">登录 / 注册</span>
      </div>
    </div>

    <!-- 宫格导航 -->
    <van-grid class="grid-nav mb-9" :column-num="2" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>

    <!-- 单元格 -->
    <van-cell title="消息通知" is-link />
    <van-cell class="mb-9" title="小智同学" is-link />
    <van-cell
      v-if="user"
      class="logout-cell"
      clickable
      title="退出登录"
      @click="onLoginOut"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserinfo } from '@/api/user'
export default {
  name: 'MyIndex',
  data() {
    return {
      userinfo: {}
    }
  },
  created() {
    if (this.user) {
      this.uploadUserinfo()
    }
  },
  methods: {
    // #1 登出功能
    async onLoginOut() {
      const res = await this.$dialog
        .confirm({
          title: '退出',
          message: '是否确认退出？'
        })
        .catch(e => e)
      // console.log(res)
      if (res === 'confirm') {
        this.$store.commit('setUser', null)
      }
    },
    // #2 获取用户信息
    async uploadUserinfo() {
      try {
        const { data: res } = await getUserinfo()
        this.userinfo = res.data
      } catch (error) {
        this.$toast('数据获取失败')
      }
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style lang="less" scoped>
.my-container {
  .login-header {
    height: 361px;
    background: url(~@/assets/banner.png);
    background-size: cover;
  }
  .not-login {
    display: flex;
    align-items: center;
    justify-content: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .login-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }

  .user-info {
    .base-info {
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          border: 4px solid #fff;
          margin-right: 23px;
        }
        .name {
          font-size: 30px;
          color: #fff;
        }
      }
    }
    .data-stats {
      display: flex;
      .data-item {
        height: 130px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }

  .grid-nav {
    .grid-item {
      height: 141px;
      i.toutiao {
        font-size: 45px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      span.text {
        font-size: 28px;
      }
    }
  }

  .logout-cell {
    text-align: center;
    color: #d86262;
  }

  .mb-9 {
    margin-bottom: 9px;
  }
}
</style>
