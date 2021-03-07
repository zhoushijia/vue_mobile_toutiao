<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->
    <!-- 个人信息 -->
    <van-cell title="头像" is-link>
      <van-image class="avatar" fit="cover" round :src="userInfo.photo" />
    </van-cell>
    <van-cell
      title="姓名"
      :value="userInfo.name"
      is-link
      @click="editUserName"
    />
    <van-cell
      title="性别"
      :value="userInfo.gender === 0 ? '男' : '女'"
      is-link
    />
    <van-cell title="生日" :value="userInfo.birthday" is-link />
    <!-- 个人信息 -->

    <!-- 修改姓名 -->
    <van-popup
      v-model="isUserProfileNameEditShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-name
        @close-update-name="isUserProfileNameEditShow = false"
        v-model="userInfo.name"
      />
    </van-popup>

    <!-- 修改姓名 -->
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/update-name'
export default {
  name: 'UserProfile',
  props: {},
  components: {
    UpdateName
  },
  data() {
    return {
      userInfo: {},
      isUserProfileNameEditShow: false
    }
  },
  created() {
    this.loadUserProfile()
  },
  mounted() {},
  methods: {
    // 获取个人配置信息
    async loadUserProfile() {
      try {
        const {
          data: { data }
        } = await getUserProfile()
        this.userInfo = data
      } catch (err) {
        this.$toast.fail('获取个人配置信息失败')
      }
    },
    // 修改用户姓名
    editUserName() {
      this.isUserProfileNameEditShow = true
    }
  },
  computed: {},
  watch: {}
}
</script>

<style scoped lang="less">
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }
}
.van-popup {
  background: #f5f7f9;
}
</style>
