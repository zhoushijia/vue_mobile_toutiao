<template>
  <div class="update-gender">
    <van-picker
      title="性别"
      show-toolbar
      :columns="columns"
      :default-index="value"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      @change="onChange"
    />
  </div>
</template>

<script>
import { editUserProfile } from '@/api/user'

export default {
  name: 'UpdateGender',
  components: {},
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      columns: ['男', '女'],
      localGender: this.value
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 确认时可以直接拿到用户选择的columns数据
    async onConfirm(val, index) {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      // 请求
      try {
        await editUserProfile({
          gender: index
        })
        // 父组件值更新
        this.$emit('input', index)
        // 关闭弹层
        this.$emit('close')
        // 更新成功提示
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    },
    onChange() {}
  },
  computed: {},
  watch: {}
}
</script>

<style lang="less" scoped></style>
