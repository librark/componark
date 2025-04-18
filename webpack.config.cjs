const path = require('path')
const { DefinePlugin, EnvironmentPlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env, argv) => {
  const devMode = argv.mode === 'development'
  const target = env.TARGET

  const commonConfig = {
    mode: argv.mode,
    entry: {
      showcase: './showcase/index.js'
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        chunks: ['showcase', 'runtime'],
        title: 'Componark',
        template: './showcase/index.html'
      }),
      new CopyWebpackPlugin({
        patterns: ['./showcase/.htaccess']
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
        base: path.resolve(__dirname, './base/'),
        components: path.resolve(__dirname, './components/'),
        screens: path.resolve(__dirname, './showcase/screens/')
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

  const rootConfig = {
    name: 'root',
    mode: argv.mode,
    entry: {
      index: './showcase/index.js'
    },
    plugins: [
      new CleanWebpackPlugin(),
      new DefinePlugin({
        PRODUCTION: !devMode,
        VERSION: JSON.stringify(require('./package.json').version),
        TARGET: JSON.stringify(target)
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: './showcase/locales/', to: 'locales/' }
        ]
      }),
      new HtmlWebpackPlugin({
        title: 'Componark',
        template: './showcase/index.html'
      })
    ]
  }

  if (devMode) {
    rootConfig.devServer = {
      static: [
        path.join(__dirname, 'dist'),
        path.join(__dirname, 'dist/ark')
      ],
      historyApiFallback: {
        rewrites: [
          { from: /^\/$/, to: '/index.html' },
          { from: /^\/ark/, to: '/ark/index.html' }
        ]
      },
      port: 7890
    }
  }

  return [rootConfig, arkConfig]
}
