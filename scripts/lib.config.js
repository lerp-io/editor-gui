var webpack = require("webpack");
var path = require("path");
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

var extract_css = new MiniCssExtractPlugin()


var cfg = {
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.(coffee)$/,
				loader: 'string-replace-loader',
				options: {
					search: 'cn:',
					replace: 'className:',
					flags: 'g'
				}
			},
			{
				test: /\.coffee$/,
				use: ['coffee-loader']
			},
			{
				test: /\.(mdx|md)?$/,
				use: ['babel-loader', '@mdx-js/loader']
			},
			{ test: /\.(xml|html|txt|glsl|svg)$/, loader: "raw-loader" },
			{ test: /\.less$/, use: ['style-loader','css-loader','less-loader']},
			{ test: /\.(css)$/, exclude: /^(https?:)?\/\//, use: ['style-loader','css-loader'] },
			{ test: /\.(woff|woff2|eot|ttf|png)$/,loader: 'url-loader' }
		]
	},
	entry: {
		index: "./components/index.coffee",
	},
	resolve: {
		extensions: [ '.js', '.coffee' ],
		fallback: { "path": false}
	},
	externals: ["react","react-dom","classnames","color"],
	output: {
		path: path.join(__dirname,'..','/dist'),
		publicPath: '/',
		filename: "editor-gui.js",
		libraryTarget: 'commonjs2'
	},
	plugins: [extract_css]
}
module.exports = cfg;