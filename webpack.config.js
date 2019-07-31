const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

// @ts-ignore
module.exports = (env, argv) => {
	const devMode = argv.mode === 'development'
	const target = env.TARGET

	const config = {
		mode: argv.mode,
		entry: {
			app: './src/showcase/screens/app/index.js',
			ark: './src/showcase/screens/ark/index.js',
			material: './src/showcase/screens/material/index.js'
		},
		output: {
			publicPath: '/',
			filename: '[name].[contenthash].js',
			path: path.join(__dirname, '/dist')
		},
		optimization: {
			runtimeChunk: 'single'
		},
		plugins: [
			new CleanWebpackPlugin(),
			new HtmlWebpackPlugin({
				chunks: ['app', 'runtime'],
				title: 'ComponArk Index',
				template: 'src/showcase/screens/app/index.html'
			}),
			new HtmlWebpackPlugin({
				chunks: ['ark', 'runtime'],
				title: 'ComponArk Ark',
				template: 'src/showcase/screens/ark/index.html',
				filename: './ark.html'
			}),
			new HtmlWebpackPlugin({
				chunks: ['material', 'runtime'],
				title: 'ComponArk Material',
				template: 'src/showcase/screens/material/index.html',
				filename: './material.html'
			}),
			new MiniCssExtractPlugin({
				filename: devMode ? '[name].css' : '[name].[hash].css',
				chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
			}),
			new webpack.DefinePlugin({
				PRODUCTION: !devMode,
				VERSION: JSON.stringify('0.1.0'),
				TARGET: JSON.stringify(target)
			}),
			new webpack.HashedModuleIdsPlugin(),
			new CopyWebpackPlugin(['src/assets/config/.htaccess'])
		],
		module: {
			rules: [
				{
					test: /\.(sa|sc|c)ss$/,
					use: [
						devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
						'css-loader',
						{
							loader: 'sass-loader',
							options: {
								includePaths: ['./node_modules']
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
		}
	}

	if (devMode) {
		// @ts-ignore
		config.devtool = 'source-map'
		// @ts-ignore
		config.devServer = {
			open: 'google-chrome',
			contentBase: './dist',
			historyApiFallback: true,
			port: 7890
		}
	}

	return config
}
