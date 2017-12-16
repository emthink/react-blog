/**
 * @desc webpack开发环境配置文件
 */

const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const PUBLICPATH = '/assets/'
const PORT = '9090'

const options = {
  // publicPath: '/', // for `ip:port`, not need `ip:port/${output}`
  publicPath: PUBLICPATH,
  loaders: {
    styles: ['style-loader', 'css-loader', 'postcss-loader'],
    imageAssets: 'url-loader?limit=6000&name=[path][name].[ext]?[hash:8]',
    iconFonts: [{
      loader: 'url-loader',
      query: {
        limit: 10000,
        name: '[path][name].[ext]?[hash:8]'
      }

    }]
  },
  beforePlugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = function (args) {
  options.ROOTPATH = args.ROOTPATH
  options.env = args.env
  return webpackMerge(require('./base.conf')(options), {
    devtool: 'source-map',
    devServer: {
      contentBase: path.join(args.ROOTPATH, './src'),
      historyApiFallback: true,
      inline: true,
      hot: true,
      port: PORT,
      proxy: {
        '*': `http://localhost:${PORT}/${PUBLICPATH}/`
      }
    },
    plugins: []
  })
}
