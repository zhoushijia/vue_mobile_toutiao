// 项目发布阶段需要用的插件
const prodPlugins = []

// 上线时 去除log
if (process.env.NODE_ENV === 'production') {
  prodPlugins.push('transform-remove-console')
}

module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [...prodPlugins]
}
