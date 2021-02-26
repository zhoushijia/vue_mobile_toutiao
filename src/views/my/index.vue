<template>
  <div class="my-container">
    <div class="login-header">
      <div
        class="login-btn"
        @click="$router.push({ name: 'login', query: { redirect: '/my' } })"
      >
        <img src="~@/assets/mobile.png" alt="" class="login-img" />
        <span class="text">登录 / 注册</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyIndex'
}
</script>

<style lang="less" scoped>
.my-container {
  .login-header {
    height: 361px;
    background: url(~@/assets/banner.png);
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
  }
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
</style>
