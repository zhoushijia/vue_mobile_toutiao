/**
 * PostCSS 配置文件
 */
module.exports = {
  plugins: {
    // 配置使用 autoprefixer 插件
    // 作用：生成浏览器 CSS 样式规则前缀
    // VueCLI 内部已经配置了 autoprefixer 插件
    // 所以又配置了一次，所以产生冲突了
    /* autoprefixer: {
      // 配置要兼容到的环境信息
      browsers: ['Android >= 4.0', 'iOS >= 8']
    }, */
    // 配置使用 postcss-pxtorem 插件
    // 作用：把 px 转为 rem
    'postcss-pxtorem': {
      /*
        第三方组件库和自定义配置文件不匹配？？？
        lib-flexible 将屏幕宽度分成了10份,设计稿标准宽度为750px，
        所以设计稿rootValue应该为75,但vant组件的设计标准值为37.5,
        需要根据css文件是自定义css还是vant的css文件来设置不同的标准。
        rootValue可以是一个函数,形参为css文件对象并可以拿到文件路径file
      */
      rootValue({ file }) {
        // return file.indexOf('vant') !== -1 ? 37.5 : 75
        // 或
        return file.includes('vant') ? 37.5 : 75
      },
      // 配置要转换的css属性,*表示所有
      propList: ['*'],
      // github-markdown.css文件不做rem适配
      exclude: 'github-markdown'
    }
  }
}
