<template>
  <!-- Wrap the image or canvas element with a block element (container) -->
  <div class="update-avatar">
    <img :src="value" ref="image" alt="" />
    <div class="toolbar">
      <span @click="$emit('close')">取消</span>
      <span @click="onUpdateAvatar">完成</span>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

import { editUserProfile } from '@/api/user'

export default {
  name: '',
  components: {},
  props: {
    value: {
      type: [String, Object],
      default: null
    }
  },
  data() {
    return {
      cropper: {}
    }
  },
  created() {},
  mounted() {
    const image = this.$refs.image
    this.cropper = new Cropper(image, {
      viewMode: 1, // 只能在裁剪的图片范围内移动
      dragMode: 'move', // 画布和图片都可以移动
      aspectRatio: 1, // 裁剪区默认正方形
      autoCropArea: 1, // 自动调整裁剪图片
      cropBoxMovable: false, // 禁止裁剪区移动
      cropBoxResizable: false, // 禁止裁剪区缩放
      background: false // 关闭默认背景
    })
  },
  methods: {
    onUpdateAvatar() {
      // 传给服务端的数据
      // console.log(this.cropper.getData())
      // 客户端
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      // 客户端直接裁剪并更新图片
      this.cropper.getCroppedCanvas().toBlob(async blob => {
        const formData = new FormData()

        // Pass the image file name as the third parameter if necessary.
        formData.append('photo', blob /*, 'example.png' */)
        try {
          const {
            data: { data }
          } = await editUserProfile(formData)
          // 关闭弹框
          this.$emit('close')
          // 更新头像信息
          this.$emit('input', data.photo)
          this.$toast.success('更新成功')
        } catch (err) {
          this.$toast.fail('更新头像失败')
        }
      })
    }
  },
  computed: {},
  watch: {}
}
</script>

<style lang="less" scoped>
.update-avatar {
  background: #000;
  width: 100%;
  height: 100%;
  .toolbar {
    position: fixed;
    bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 28px;
    color: #fff;
    padding: 0 15px;
    box-sizing: border-box;
  }
}
/* Ensure the size of the image fit the container perfectly */
img {
  display: block;
  max-width: 100%;
}
</style>
