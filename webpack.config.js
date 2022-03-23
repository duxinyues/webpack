const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 删除打包文件
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require('webpack')

const allDevtoolModes = [
  'eval',
  'cheap-eval-source-map',
  'cheap-module-eval-source-map',
  'eval-source-map',
  'cheap-source-map',
  'cheap-module-source-map',
  'inline-cheap-source-map',
  'inline-cheap-module-source-map',
  'source-map',
  'inline-source-map',
  'hidden-source-map',
  'nosources-source-map'
]

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  mode: "development",
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 2022,
    // 设置代理
    proxy: {
      '/api': {
        target: 'https://api.github.com'
      }
    },
    // 开启 HMR 特性，如果资源不支持 HMR 会 fallback 到 live reloading
    hot: true
    // 只使用 HMR，不会 fallback 到 live reloading
    // hotOnly: true
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
    new CopyWebpackPlugin({ patterns: ['public'] }),
    // HMR 特性所需要的插件
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/, // 根据打包过程中所遇到文件路径匹配是否使用这个 loader
        use: ['style-loader', 'css-loader'] // 指定具体的 loader
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env',{ modules: 'commonjs' }]
            ]
          }
        }
      }
    ]
  },
  // devtool: 'source-map' // source map 设置
}