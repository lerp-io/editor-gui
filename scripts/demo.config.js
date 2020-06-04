var webpack = require("webpack");
var path = require("path");

var cfg = {
	devtool: 'source-map',
	module: {
		rules: [
			{ test: /\.coffee$/, use: "coffee-loader"},
			{ test: /\.(xml|html|txt|md|glsl|svg)$/, loader: "raw-loader" },
			{ test: /\.less$/, use: ['style-loader','css-loader','less-loader']},
			{ test: /\.(css)$/, exclude: /^(https?:)?\/\//, use: ['style-loader','css-loader'] },
			{ test: /\.(woff|woff2|eot|ttf|png)$/,loader: 'url-loader?limit=65000' }
		]
	},

	entry: {
		demo: path.join(__dirname,'..','/demo.coffee')
	},
	
	resolve: {
		extensions: [ '.js', '.coffee' ]
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