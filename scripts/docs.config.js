var webpack = require("webpack");
var path = require("path");

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
			{ test: /\.(xml|html|txt|md|glsl|svg)$/, loader: "raw-loader" },
			{ test: /\.less$/, use: ['style-loader','css-loader','less-loader']},
			{ test: /\.(css)$/, exclude: /^(https?:)?\/\//, use: ['style-loader','css-loader'] },
			{ test: /\.(woff|woff2|eot|ttf|png)$/,loader: 'url-loader?limit=65000' }
		]
	},

	entry: {
		docs: path.join(__dirname,'..','/docs-site/main.coffee')
	},
	
	resolve: {
		extensions: [ '.js', '.coffee' , '.tsx', '.ts' ]
	},

	output: {
		path: path.join(__dirname,'..','/dist'),
		publicPath: '/dist',
		filename: "[name].js"
	},
	
	devServer: {
		host: 'localhost',
		port: 3234,
		disableHostCheck: true
		// host: 'localhost'
	}
}
module.exports = cfg;