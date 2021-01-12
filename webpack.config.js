const path = require('path')
const { DefinePlugin, EnvironmentPlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// @ts-ignore
module.exports = (env, argv) => {
  const devMode = argv.mode === 'development'
  const target = env.TARGET

  const config = {
    mode: argv.mode,
    entry: {
      app: './src/showcase/index.js'
    },
    output: {
      publicPath: '/',
      filename: '[name].[contenthash].js',
      path: path.join(__dirname, '/dist')
    },
    optimization: {
      runtimeChunk: 'single',
      moduleIds: 'deterministic'
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        chunks: ['app', 'runtime'],
        title: 'componark',
        template: './src/showcase/index.html'
      }),
      new MiniCssExtractPlugin({
        filename: devMode ? '[name].css' : '[name].[hash].css',
        chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
      }),
      new DefinePlugin({
        PRODUCTION: !devMode,
        VERSION: JSON.stringify(require('./package.json').version),
        TARGET: JSON.stringify(target)
      }),
      new EnvironmentPlugin({
        ARK_THEME: 'material'
      })
    ],
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  outputStyle: 'compressed',
                  includePaths: ['./node_modules']
                }
              }
            }
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: ['file-loader']
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/'
              }
            }
          ]
        }
      ]
    },

    resolve: {
      alias: {
        base: path.resolve(__dirname, './src/base/'),
        styles: path.resolve(__dirname, './src/base/theme/styles/'),
        components: path.resolve(__dirname, './src/components/'),
        screens: path.resolve(__dirname, './src/showcase/screens/')
      }
    }
  }

  if (devMode) {
    // @ts-ignore
    config.devServer = {
      contentBase: './dist',
      historyApiFallback: true,
      port: 7890
    }
  }

  return config
}
