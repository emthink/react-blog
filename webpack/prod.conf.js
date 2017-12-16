/**
 * [webpack生产环境配置文件]
 */

const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// 拓展配置
const options = {
  loaders: {
    styles: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        'css-loader',
        'postcss-loader'
      ]
    }),
    imageAssets: [
      'url-loader?limit=6000&name=[path][name]-[hash:8].[ext]',
      {
        loader: 'img-loader',
        options: {
          // 根据环境判断是否启用资源压缩
          // enabled: process.env.NODE_ENV === 'production',
          gifsicle: {
            interlaced: false // 替换使用渐进式渲染
          },
          mozjpeg: {
            progressive: true // 创建基准jpeg文件
          },
          optipng: {
            optimizationLevel: 4, // 优化级别，0-7，值越大，压缩越多
          },
          pngquant: {
            quality: '75-90', // 压缩质量，0-100，值越高，质量越高
            floyd: 0.5, // 图片抖动值，0-1，越高抖动越厉害
            speed: 2 // 执行速度，0-10，速度过高质量受损，不建议过高
          },
          svgo: {
            plugins: [
              { removeTitle: true }, // 去除标题信息
              { convertPathData: false } // 转换路径为更短的相对或决定路径
            ]
          }
        }
      }
    ],
    iconFonts: [{
      loader: 'url-loader',
      query: {
        limit: 10000,
        name: '[path][name]-[hash:8].[ext]'
      }
    }]
  }
}

module.exports = function (args) {
  options.ROOTPATH = args.ROOTPATH
  options.env = args.env
  return webpackMerge(require('./base.conf')(options), {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': 'production'
      }),
      // 生成独立css文件
      new ExtractTextPlugin({
        filename: 'css/[name].css'
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  })
}
