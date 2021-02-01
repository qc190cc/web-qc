/**
 * 移动端vue配置rem适配--postcss-pxtorem、amfe-flexible
 * **/

// 移动端vue配置 REM 适配
// Vant 中的样式默认使用px作为单位，如果需要使用rem单位，推荐使用以下两个工具：
// postcss-pxtorem 是一款 postcss 插件，用于将单位转化为 rem
// amfe-flexible 用于设置 rem 基准值

// 一、使用 amfe-flexible 动态设置 REM 基准值（html 标签的字体大小）
// 1、安装
// # yarn add amfe-flexible
// npm i amfe-flexible

// 2、然后在 main.js 中加载执行该模块
// import 'amfe-flexible'

// 最后测试：在浏览器中切换不同的手机设备尺寸，观察 html 标签 font-size 的变化。

// 二、使用 postcss-pxtorem 将 px 转为 rem
// 1、安装
// # yarn add -D postcss-pxtorem
// # -D 是 --save-dev 的简写
// npm install postcss-pxtorem -D

// 2、然后在项目根目录中创建 postcss.config.js 文件

module.exports = {
  plugins: {
    "postcss-pxtorem": {
      // 设计稿 375:37.5
      // 设计稿：750:75
      // Vant 是基于 375
      rootValue: 37.5, // 根据设计图尺寸写，设计图是1920，就写192
      propList: ['*'], // 需要被转换的属性
      selectorBlackList: ['el-'], // 不进行px转换的选择器
    }
  }
}
 
// 3、配置完毕，重新启动服务

// 最后测试：在浏览器中审查元素的样式查看是否已将 px 转换为 rem。

// 注意：

// 1.只能转换单独的 .css|.less|.scss 之类的文件、.vue 文件中的 style 中的 px

// 2.不能转换行内样式中的 px