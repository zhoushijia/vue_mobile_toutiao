<template>
  <div class="update-name">
    <van-nav-bar
      title="修改姓名"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close-update-name')"
      @click-right="onUpdateName"
    />
    <!-- 修改框 -->
    <div style="padding:10px">
      <van-field
        v-model.trim="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入姓名"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { editUserProfile } from '@/api/user'
export default {
  name: 'UpdateName',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      localName: this.value
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 修改姓名
    async onUpdateName() {
      if (this.localName.length <= 0) return this.$toast('输入不能为空')
      // 慢速网络下防止再次点击修改，更新加载提示
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      // 请求
      try {
        await editUserProfile({
          name: this.localName
        })
        // 父组件值更新
        this.$emit('input', this.localName)
        // 关闭弹层
        this.$emit('close-update-name')
        // 更新成功提示
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    }
  },
  computed: {},
  watch: {}
}
</script>

<style lang="less" scoped></style>
