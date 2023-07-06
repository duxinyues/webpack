const webpack = require('webpack')
const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //抽离CSS为独立文件的插件

module.exports = {
    mode: 'development',
    entry: "./main.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "./dist")
    },
    module: {
        rules: [
            {
                test: /\.(css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
                // use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // 指定抽离的之后形成的文件名
            // filename: 'styles/[name]_[contenthash:8].css'
            filename: 'styles/[name]_[contenthash:8].css'
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        // 开发时可直接访问到 ./public 下的静态资源，这些资源在开发中不必打包
        port: 3005,
        open: true, // 打开浏览器
        compress: false, // 是否压缩
        static: "./",
        proxy: {
            '/api': {
                target: "https://api.github.com",
                pathRewrite: {
                    "^/api": ""
                },
                changeOrigin: true
            }
        },
        hot: true,
    }

}