/* 
需要安装两个库postcss、autoprefixer。要现实的效果就是我们编写一般的样式，渲染都页面的dom节点有面向各种浏览器厂商的样式。
postcss类似一个平台，上面有很多插件autoprefixer就其中一个。
postcss就像一个管子。autoprefixer是里面的过滤器。你写的css从管子中流过，经过他们的处理就出现了不同的结果。
*/
module.exports = {
  plugins: {
    autoprefixer: {},
  },
};
