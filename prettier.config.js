// prettier用来格式化代码,eslint-plugin-prettier就是通过JS来判断代码格式是否正确,eslint-config-prettier好像是prettier和ESLint之间有些规则好像不一样。所以eslint-config-prettier将prettier一些规则默认关闭了。

/*不同的编辑器需要下载相应的prettier插件,如果搭配eslint使用,还需要去.eslintrc.js中进行配置 
如果你的vsCode安装了prettier插件。那么prettier插件就会读取根目录下的prettier.config.js文件。
*/

module.exports = {
  printWidth: 100,
  semi: true,
  vueIndentScriptAndStyle: true,
  singleQuote: true,
  trailingComma: 'all',
  proseWrap: 'never',
  htmlWhitespaceSensitivity: 'strict',
  endOfLine: 'auto',
};
