<template>
  <!-- 时间选择器 -->
  <van-datetime-picker v-model="currentDate" type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate" @cancel="$emit('close')" @confirm="onConfirm" />
</template>

<script>
import { editUserProfile } from '@/api/user'
import dayjs from 'dayjs'
export default {
  name: 'UpdateBirth',
  components: {},
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 确认时可以直接拿到用户选择的columns数据
    async onConfirm() {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      // 请求
      try {
        const localBirth = dayjs(this.currentDate).format('YYYY-MM-DD')
        await editUserProfile({
          birthday: localBirth
        })
        // 父组件值更新
        this.$emit('input', localBirth)
        // 关闭弹层
        this.$emit('close')
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
