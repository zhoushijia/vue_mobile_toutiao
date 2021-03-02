<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell>
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        class="edit-btn"
        type="danger"
        round
        plain
        size="mini"
        @click="isEditShow = !isEditShow"
        >{{ isEditShow ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10" class="my-grid">
      <!-- #3 用户点击索引传递给主页 -->
      <van-grid-item
        class="grid-item"
        v-for="(item, index) in userChannel"
        :key="item.id"
        @click="onEditChannel(item, index)"
      >
        <!-- 点击编辑控制关闭图标的显示隐藏 -->
        <van-icon
          slot="icon"
          name="clear"
          v-show="isEditShow && !fixedChannels.includes(item.id)"
        ></van-icon>
        <span
          slot="text"
          :class="{ text: true, active: index === activeName }"
          >{{ item.name }}</span
        >
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell>
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10" class="recommend-grid">
      <van-grid-item
        class="grid-item"
        v-for="item in recommendChannels"
        :key="item.id"
        :text="item.name"
        icon="plus"
        @click="onAddChannel(item)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/article'
export default {
  name: 'ChannelEdit',
  data() {
    return {
      // 所有频道
      allChannels: [],
      // 关闭图标的显示
      isEditShow: false,
      // ! 不需要删除的频道 采用数组可以设置多个条件
      fixedChannels: [0]
    }
  },
  props: {
    // #1 获取从首页传来的频道数组
    userChannel: {
      type: Array,
      required: true
    },
    // #2 频道索引
    activeName: {
      type: Number,
      required: true
    }
  },
  created() {
    this.loadAllChannels()
  },
  mounted() {},
  methods: {
    // #4 获取所有频道 计算属性得到推荐频道
    async loadAllChannels() {
      try {
        const {
          data: { data }
        } = await getAllChannels()
        this.allChannels = data.channels
      } catch (error) {
        this.$toast('获取所有频道失败')
      }
    },
    // #5 添加频道到我的频道 同时会触发推荐频道的删除
    onAddChannel(channel) {
      // 通知父亲修改
      // 这里只要添加,会触发userChannel改变,从而影响到计算属性的改变
      this.$emit('addChannel', channel)
    },
    // 编辑频道
    onEditChannel(channel, index) {
      if (this.isEditShow) {
        // 当编辑时不能选择频道   删除频道
        // 推荐不能删除  即 固定频道不删除
        if (index === 0) return
        // this.$emit('removeChannel', channel.id)
        this.userChannel.splice(index, 1)
        // 解决splice方法导致的index角标塌陷，引发的高亮问题
        if (index <= this.activeName) {
          this.$emit('updateChannel', this.activeName - 1)
        }
      } else {
        // this.$emit('sendIndex', index)
        this.$emit('updateChannel', index, false)
      }
    }
  },
  computed: {
    // 获取推荐频道
    recommendChannels() {
      return this.allChannels.filter(
        channel => !this.userChannel.some(c => c.id === channel.id)
      )
    }
  },
  watch: {}
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333333;
  }

  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      // 文字不换行
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
        // 去除文字上外边距
        margin-top: 0;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }

  /deep/ .my-grid {
    .grid-item {
      // 关闭icon定位设置
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }

  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        // 改变flex布局朝向
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
