const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
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
            {
                test: /\.(png|svg|gif|jpe?g)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        esModule: false // 不转为esModule
                    }
                }]
            }
        ]
    }
}