const path = require('path')

const webpack = require('webpack')  //启用热更新的第二步

//导入在内存中生成html页面的插件
const htmlWebpackPlugins = require('html-webpack-plugin')

const VueLoaderPlugin = require('vue-loader/lib/plugin');

//这个配置文件，起始就是一个js文件， 通过Node 中的模块操作，向外暴露了一个配置对象
module.exports = {
  //在配置文件中，需要手动指定入口和出口

  entry: path.join(__dirname, './src/main.js'), //入口，表示，要使用webpack打包哪个人间
  output: { //输出文件相关的配置
    path: path.join(__dirname, './dist'),  //指定打包好的文件,输出到哪个目录中去
    filename: 'bundle.js' //指定输出文件的名称
  },
  plugins: [ // 对象数组 配置插件的节点
    new webpack.HotModuleReplacementPlugin(),   //new一个新的热更新模块对象，这是启用热更新的第三步
    new VueLoaderPlugin(),
    new htmlWebpackPlugins({    //插件一个在内存中生成html的插件
      template: path.join(__dirname, './src/index.html'), //指定模板页面，将来根据指定的页面路径，去生成内存中的页面
      filename: 'index.html'  //指定生成的页面的名称
    }),
    
  ],
  module: {   //这个节点用于配置所有的第三方模块加载器
    rules: [    //这是所有第三方模块的匹配规则
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },   //配置处理.css文件的第三方loader
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },   //配置处理.less文件的第三方loader
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },   //配置处理.scss文件的第三方loader      
      { test: /\.vue$/, use: 'vue-loader' },
      {
        test: /\.(woff|woff2|svg|ttf|eot)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,  //这里要足够大这样所有的字体图标都会打包到css中
          }
        }
      },
      { test: /\.js$/, use: "babel-loader", exclude: /node_modules/ },   //这是配置babel来转化高级语法
      { test: /vue-preview.src.*?js$/,loader: 'babel-loader' },
    ]
  }

}

