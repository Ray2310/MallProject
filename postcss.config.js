// postcss.config.js
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      // viewportWidth:设计稿的视口宽度视图适配
      viewportWidth: 375,
    },  
  },
}
