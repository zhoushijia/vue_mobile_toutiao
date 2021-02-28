<template>
  <div class="articles-item">
    <van-cell>
      <!-- van-multi-ellipsis--l2 style内置样式 -->
      <div slot="title" class="title van-multi-ellipsis--l2">
        {{ article.title }}
      </div>
      <!-- 下方展示内容 -->
      <div slot="label">
        <div class="cover-wrap" v-if="article.cover.type === 3">
          <div
            v-for="(img, index) in article.cover.images"
            :key="index"
            class="cover-item"
          >
            <van-image :src="img" fit="cover" class="cover-item-img" />
          </div>
        </div>
        <div class="label-info-wrap">
          <span>{{ article.aut_name }}</span>
          <span>{{ article.comm_count }}</span>
          <span>{{ article.pubdate | relativeTime }}</span>
        </div>
      </div>
      <!-- 右侧展示内容 -->
      <van-image
        v-if="article.cover.type === 1"
        class="right-cover"
        :src="article.cover.images[0]"
        slot="default"
        fit="cover"
      />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ArticlesItem',
  data() {
    return {}
  },
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  computed: {
    // isTitle() {
    //   return this.article.title + '一一一一一'
    // }
  }
}
</script>

<style lang="less" scoped>
.articles-item {
  .cover-wrap {
    display: flex;
    padding: 30px 0;

    .cover-item {
      flex: 1;
      height: 146px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-item-img {
        width: 100%;
        height: 146px;
      }
    }
  }
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }
  .right-cover {
    width: 232px;
    height: 146px;
  }
  .label-info-wrap span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }
}
</style>
