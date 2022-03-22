const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 删除打包文件
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  mode: "development",
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 9000
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: '设置HTML的title标签内容',
      meta: {
        viewport: 'width=device-width'
      },
      template: "./src/index.html"
    }),
    new CopyWebpackPlugin({ patterns: ['public'] })
  ],
  module: {
    rules: [
      {
        test: /\.css$/, // 根据打包过程中所遇到文件路径匹配是否使用这个 loader
        use: ['style-loader', 'css-loader'] // 指定具体的 loader
      }
    ]
  }
}