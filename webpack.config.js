
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '../deploy')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inlineSource: '.(js|css)$'
        }),
        new HtmlWebpackInlineSourcePlugin(),
        new VueLoaderPlugin()
    ],
    entry: {
        app: './src/main.js'
    },
    stats: {
        performance: false
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["vue-style-loader", "css-loader", "postcss-loader"]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    }


};