const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin=require('mini-css-extract-plugin')

const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");


module.exports={
    entry:path.resolve(__dirname,'./src/main.js'),
    output:{
        filename:'main.js',
        path:path.resolve(__dirname,'./dist')
    },
    mode:'production',
    module:{
        rules:[
           { 
               test:/\.js$/,
               use:'babel-loader',
               exclude:'/node_modules/'
            },
            {
                test:/\.styl$/,
                use:[ 
                    {
                        loader:MiniCssExtractPlugin.loader,
                        options:{hmr:true}
                    },
                    {
                    loader:'css-loader',
                    options:{
                        importLoaders:2
                    }},
                    'postcss-loader','stylus-loader'
                ]
            }
        ]
    },
    devServer:{
        port:3000,
        open:true,
        hot:true
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'./public/index.html'),
            filname:'index.html',
            minify:{
                removeComments:true,
                removeAttributeQuotes:true,
                collapseWhitespace:true
            }
        }),
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,       //一个正则表达式，指示应优化/最小化的资产的名称。提供的正则表达式针对配置中ExtractTextPlugin实例导出的文件的文件名运行，而不是源CSS文件的文件名。默认为/\.css$/g
            cssProcessor: require('cssnano'), //用于优化\最小化CSS的CSS处理器，默认为cssnano
            cssProcessorOptions: { safe: true, discardComments: { removeAll: true } }, //传递给cssProcessor的选项，默认为{}
            canPrint: true                    //一个布尔值，指示插件是否可以将消息打印到控制台，默认为true
       }),
        new MiniCssExtractPlugin({
            filname:'main.styl'
        }),

   
    ]
}