const { resolve } = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: {
        main: './src/main.ts'
    },
    output: {
        filename: '[name].[chunkhash].js',
        path: resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                include: resolve(__dirname, 'src'),
                exclude: /[\\/]node_modules[\\/]/,
                use: [
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'ts-loader',
                        options: { appendTsSuffixTo: [/\.vue$/] }
                    }
                ]

            },
            {
                test: /\.jsx?$/,
                include: resolve(__dirname, 'src'),
                exclude: /[\\/]node_modules[\\/]/,
                loader: 'babel-loader'
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
            favicon: './src/favicon.ico'
          }),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.vue', '.jsx'],
    },
}