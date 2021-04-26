const path = require('path')
const { DefinePlugin, EnvironmentPlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env, argv) => {
  const devMode = argv.mode === 'development'
  const target = env.TARGET

  const commonConfig = {
    mode: argv.mode,
    entry: {
      showcase: './src/showcase/design/index.js'
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        chunks: ['showcase', 'runtime'],
        title: 'Componark',
        template: './src/showcase/design/index.html'
      }),
      new CopyWebpackPlugin({
        patterns: [
          "src/showcase/design/.htaccess" 
        ],
      }),
      new MiniCssExtractPlugin({
        filename: devMode ? '[name].css' : '[name].[hash].css',
        chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
      }),
      new DefinePlugin({
        PRODUCTION: !devMode,
        VERSION: JSON.stringify(require('./package.json').version),
        TARGET: JSON.stringify(target)
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
                  outputStyle: devMode ? 'expanded': 'compressed',
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
        },
        {
          test: /\.(rst|d\.ts)$/,
          loader: 'ignore-loader'
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

  const arkConfig = Object.assign({}, commonConfig, {
    name: 'ark',
    mode: argv.mode,
    output: {
      publicPath: '/ark/',
      filename: '[name].[contenthash].js',
      path: path.join(__dirname, '/dist/ark')
    },
    plugins: commonConfig.plugins.concat([
      new EnvironmentPlugin({
        ARK_DESIGN: 'ark'
      })
    ])
  })

  const materialConfig = Object.assign({}, commonConfig, {
    name: 'material',
    mode: argv.mode,
    output: {
      publicPath: '/material/',
      filename: '[name].[contenthash].js',
      path: path.join(__dirname, '/dist/material')
    },
    plugins: commonConfig.plugins.concat([
      new EnvironmentPlugin({
        ARK_DESIGN: 'material'
      })
    ])
  })

  const rootConfig = {
    name: 'root',
    mode: argv.mode,
    entry: {
      index: './src/showcase/index.js'
    },
    plugins: [
      new CleanWebpackPlugin(),
      new DefinePlugin({
        PRODUCTION: !devMode,
        VERSION: JSON.stringify(require('./package.json').version),
        TARGET: JSON.stringify(target)
      }),
      new HtmlWebpackPlugin({
        title: 'Componark',
        template: './src/showcase/index.html'
      }),
    ]
  }

  if (devMode) {
    rootConfig.devServer = {
      contentBase: [
        path.join(__dirname, 'dist'),
        path.join(__dirname, 'dist/ark'),
        path.join(__dirname, 'dist/material'),
      ],
      historyApiFallback: {
        rewrites: [
          { from: /^\/$/, to: '/index.html' },
          { from: /^\/ark/, to: '/ark/index.html' },
          { from: /^\/material/, to: '/material/index.html' },
        ]
      },
      port: 7890
    }
  }

  return [rootConfig, arkConfig, materialConfig]
}
