<template>
  <div class="searc-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <!-- 方法一：通知父亲修改，方法二：将数组内容清空，且不改变数组地址 -->
        <span @click="$emit('clear-search-histories')">全部删除</span>
        <!-- <span @click="searchHistories.splice(0)">全部删除</span> -->
        &nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon v-else slot="default" name="delete" @click="isDeleteShow = true"></van-icon>
    </van-cell>
    <van-cell :title="history" v-for="(history, index) in searchHistories" :key="index" @click="updateSearchHistories(history, index)">
      <van-icon slot="default" name="close" v-show="isDeleteShow"></van-icon>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isDeleteShow: false
    }
  },
  created() {},
  mounted() {},
  methods: {
    updateSearchHistories(item, i) {
      if (this.isDeleteShow) {
        // 删除历史
        this.searchHistories.splice(i, 1)
      } else {
        // 选择内容并发起搜索
        this.$emit('search', item)
      }
    }
  },
  computed: {},
  watch: {}
}
</script>

<style lang="less" scoped></style>
