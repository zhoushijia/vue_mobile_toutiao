<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录" />
    <!-- 登录表单 -->
    <van-form @submit="onLogin" ref="loginFormRef">
      <van-field
        name="mobile"
        placeholder="请输入用户名"
        v-model="user.mobile"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        name="code"
        placeholder="请输入短信验证码"
        v-model="user.code"
        :rules="userFormRules.code"
        maxlength="6"
        type="number"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <!-- 倒计时组件 -->
          <!-- 倒计时结束触发finish -->
          <van-count-down
            v-if="isCountDownShow"
            :time="60 * 1000"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <!-- 发送验证码 -->
          <!-- native-type="button" 保证不触发提交事件 -->
          <van-button
            v-else
            round
            size="small"
            type="default"
            class="send-sms-btn"
            native-type="button"
            @click="sendSms"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button block type="info" native-type="submit" class="login-btn"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/login'
export default {
  name: 'loginIndex',
  data() {
    return {
      // 表单数据收集
      user: {
        mobile: '',
        code: ''
      },
      // 表单校验规则
      userFormRules: {
        mobile: [
          { required: true, message: '请填写手机号' },
          { pattern: /^1[3578]\d{9}$/, message: '手机号格式不正确' }
          // 下面这种写法不正确
          // { pattern: /^1[3|5|7|8]\d{9}$/, message: '手机号格式不正确' }
        ],
        code: [
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式不正确' }
        ]
      },
      // 倒计时组件显示控制
      isCountDownShow: false
    }
  },
  methods: {
    // #1 登录
    async onLogin(v) {
      // vant 组件表格收集数据方式
      console.log(v)

      // 信息校验 这里组件内部已经包含预校验

      // 提示框
      this.$toast.loading({
        message: '登录中',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 一直持续
      })

      // 发请求登录
      try {
        const { data: res } = await login(this.user)
        // token 的处理
        this.$store.commit('setUser', res.data)
        // 下一次的 toast 会覆盖上一次的 toast
        this.$toast.success('登录成功')
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('电话或验证码不存在')
        } else {
          this.$toast.fail('登录失败')
        }
      }
    },
    // #2 发送验证码
    async sendSms() {
      // 验证手机号是否合法
      try {
        await this.$refs.loginFormRef.validate('mobile')
      } catch (error) {
        return console.log(error)
      }
      // 显示倒计时
      this.isCountDownShow = true
      // 发送验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (error) {
        if (error.response.status === 429) {
          this.$toast('发送过于频繁,请稍后重试')
        } else {
          this.$toast('发送失败,请稍后重试')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .toutiao {
    font-size: 37px;
  }

  .send-sms-btn {
    width: 160px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }

  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
