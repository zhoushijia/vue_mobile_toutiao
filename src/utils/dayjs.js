import Vue from 'vue'
import dayjs from 'dayjs'
// 加载中文语言包
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')
Vue.filter('relativeTime', value => {
  // 到 X 的相对时间
  return dayjs().to(dayjs(value))
})
