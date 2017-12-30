/**
 * [webpack基础配置文件]
 */

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function (options) {
  const PUBLICPATH = options.publicPath || '/assets/'
  const ROOTPATH = options.ROOTPATH
  const entry = ['./app.js']
  return {
    name: 'browser',
    context: path.resolve(ROOTPATH, 'src/'),
    entry: {
      app: options._DEV_
        ? entry.concat(`webpack-hot-middleware/client?path=${PUBLICPATH}__webpack_hmr`) : entry
    },
    output: {
      publicPath: PUBLICPATH,
      filename: 'scripts/[name].js',
      path: path.resolve(ROOTPATH, 'dist/'),
      chunkFilename: '[name].js'
    },
    module: {
      loaders: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            'cacheDirectory': true
          }
        },
        {
          test: /\.s?[ac]ss$/,
          use: options.loaders.styles
        }, {
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: options.loaders.imageAssets
        }, {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: options.loaders.iconFonts
        }
      ]
    },
    resolve: {
      modules: [
        'node_modules/'
      ],
      alias: {
        'entryHtml$': path.resolve(ROOTPATH, 'src/index.html'),
        components: path.resolve(ROOTPATH, 'src/components/'),
        containers: path.resolve(ROOTPATH, 'src/containers/'),
        routes: path.resolve(ROOTPATH, 'src/routes/'),
        store: path.resolve(ROOTPATH, 'src/store/'),
        api: path.resolve(ROOTPATH, 'src/api/'),
        config: path.resolve(ROOTPATH, 'src/config/'),
        constants: path.resolve(ROOTPATH, 'src/constants/'),
        helper: path.resolve(ROOTPATH, 'src/helper/'),
        styles: path.resolve(ROOTPATH, 'src/styles/')
      },
      extensions: ['.js', '.jsx', '.json']
    },
    plugins: (options.beforePlugins || []).concat([
      new webpack.DefinePlugin(options.globals),
      // 抽取js同时与ExtractTextPlugin搭配为公共块（common chunk）抽取样式文件
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common', // chunk name, 不指定filename时，生成文件的默认文件名
        filename: 'scripts/common.js'
      }),
      new HtmlWebpackPlugin({
        alwaysWriteToDisk: true,
        template: path.resolve(ROOTPATH, 'src/index.html'),
        hash: false,
        favicon: path.resolve(ROOTPATH, 'public/icon-live.png'),
        filename: 'index.html',
        inject: 'body',
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeAttributeQuotes: true
        }
      })
    ])
  }
}
