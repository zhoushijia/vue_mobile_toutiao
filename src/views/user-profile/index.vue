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

    <!-- 头像上传栏 -->
    <input type="file" hidden ref="imgFile" @change="onUpdateAvatar" />
    <!-- 头像上传栏 -->

    <!-- 个人信息 -->
    <van-cell title="头像" is-link @click="$refs.imgFile.click()">
      <van-image class="avatar" fit="cover" round :src="userInfo.photo" />
    </van-cell>
    <van-cell
      title="姓名"
      :value="userInfo.name"
      is-link
      @click="isUserProfileNameEditShow = true"
    />
    <van-cell
      title="性别"
      :value="userInfo.gender === 0 ? '男' : '女'"
      is-link
      @click="isUserProfileGenderEditShow = true"
    />
    <van-cell
      title="生日"
      :value="userInfo.birthday"
      is-link
      @click="isUserProfileBirthEditShow = true"
    />
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

    <!-- 修改性别 -->
    <van-popup v-model="isUserProfileGenderEditShow" position="bottom">
      <update-gender
        @close="isUserProfileGenderEditShow = false"
        v-model="userInfo.gender"
      />
    </van-popup>
    <!-- 修改性别 -->

    <!-- 修改生日 -->
    <van-popup v-model="isUserProfileBirthEditShow" position="bottom">
      <update-birth
        @close="isUserProfileBirthEditShow = false"
        v-model="userInfo.birthday"
      />
    </van-popup>
    <!-- 修改生日 -->

    <!-- 修改头像图片 -->
    <van-popup
      v-model="isUserProfileAvatarEditShow"
      position="bottom"
      style="height: 100%"
    >
      <!-- 重新渲染，清楚弹框的display -->
      <update-avatar
        v-if="isUserProfileAvatarEditShow"
        :img="avatar"
        @close="isUserProfileAvatarEditShow = false"
        @update-avatar="userInfo.photo = $event"
      />
    </van-popup>
    <!-- 修改头像图片 -->
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/update-name'
import UpdateGender from './components/update-gender'
import UpdateBirth from './components/update-birth'
import UpdateAvatar from './components/update-avatar'
export default {
  name: 'UserProfile',
  props: {},
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirth,
    UpdateAvatar
  },
  data() {
    return {
      userInfo: {},
      isUserProfileNameEditShow: false,
      isUserProfileGenderEditShow: false,
      isUserProfileBirthEditShow: false,
      isUserProfileAvatarEditShow: false,
      avatar: ''
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
    // ! 监听file上传的change事件
    onUpdateAvatar() {
      // 拿到文件对象
      const file = this.$refs.imgFile.files[0]
      // 创建blob格式的图片信息
      // blob格式数据可以直接作为img的src
      this.avatar = window.URL.createObjectURL(file)
      // 显示头像更改弹层
      this.isUserProfileAvatarEditShow = true
      // 清空input框
      this.$refs.imgFile.value = ''
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
