const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        // assetModuleFilename: 'img/[name].[hash:4][ext]'
    },
    module: {
        rules: [{
                test: /\.css$/, // 一般就是一个正则表达式， 用于匹配需要处理的类型
                use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                esModule: false
                            }
                        },
                        // 'css-loader',
                        'postcss-loader'
                    ] // loader有执行顺序问题，从右向左，从下到上
            },
            {
                test: /\.less$/, // 一般就是一个正则表达式， 用于匹配需要处理的类型
                use: [
                        'style-loader',
                        'css-loader',
                        'postcss-loader',
                        'less-loader'
                    ] // loader有执行顺序问题，从右向左，从下到上
            },
            // {
            //     test: /\.(png|svg|gif|jpe?g)$/,
            //     type: 'asset/resource',
            //     generator: {
            //         filename: 'img/[name].[hash:4][ext]'
            //     }
            //     // use: [{
            //     //     loader: 'url-loader',
            //     //     options: {
            //     //         name: 'img/[name].[hash:6].[ext]',
            //     //         // outputPath: 'img'
            //     //         // url-loader能够内部调用file-loader
            //     //         // limit:
            //     //     }
            //     // }]
            // }
            // {
            //     test: /\.(png|svg|gif|jpe?g)$/,
            //     type: 'asset/inline',
            // }
            {
                test: /\.(png|svg|gif|jpe?g)$/,
                type: 'asset',
                generator: {
                    filename: 'img/[name].[hash:4][ext]'
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 30 * 1024
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin()
    ]
}