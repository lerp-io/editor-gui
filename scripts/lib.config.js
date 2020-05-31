var webpack = require("webpack");
var path = require("path");
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

var extract_css = new MiniCssExtractPlugin({
	filename: process.env.LIBNAME+".css",
	chunkFilename: process.env.LIBNAME+"-[id].css"
})


var cfg = {
	devtool: 'source-map',
	module: {
		rules: [
			{ test: /\.coffee$/, use: "coffee-loader"},
			{ test: /\.(xml|html|txt|md|glsl|svg)$/, loader: "raw-loader" },
			{ test: /_\.(less)$/, exclude: /^(https?:)?\/\//,use: [{loader: MiniCssExtractPlugin.loader},{loader:'css-loader'},{
			  	loader:'less-loader',
			  	options: {
			  		modifyVars: {
			  			"dim": process.env.DIM+"px"
			  		}
			  	}
			  }]
			},
			{ test: /[^_]\.(less)$/, exclude: /^(https?:)?\/\//,use: [{loader: MiniCssExtractPlugin.loader},{loader:'css-loader',options: {
			    modules: true,
			    // importLoaders: 1,
			     localIdentName: 'lui-[local]'//localIdentName: 'lui-[hash:base64:5]'
			  }},{
			  	loader:'less-loader',
			  	options:{
			  		modifyVars:{"dim":process.env.DIM+"px"}
			  	}

			  }] },
			{ test: /\.(css)$/, exclude: /^(https?:)?\/\//, use: [{loader: MiniCssExtractPlugin.loader},'css-loader'] },
			{ test: /\.(woff|woff2|eot|ttf|png)$/,loader: 'url-loader?limit=65000' }
		]
	},
	entry: {
		index: "./components/index.coffee",
	},
	resolve: {
		extensions: [ '.js', '.coffee' ]
	},
	externals: ["re-slide","react","react-dom","classnames","color"],
	output: {
		path: path.join(__dirname,'..','/dist'),
		publicPath: '/',
		filename: "lui.js",
		libraryTarget: 'commonjs2'
	},
	plugins: [extract_css]
}
module.exports = cfg;