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
				test: /\.svg$/,
				use: ['@svgr/webpack']
			},
			{
				test: /\.coffee$/,
				use: ['coffee-loader']
			},
			{
				test: /\.(mdx|md)?$/,
				use: [{loader:'babel-loader',options:{presets:['@babel/preset-react']}}, '@mdx-js/loader'],
			},
			{ test: /\.(xml|html|txt|glsl)$/, loader: "raw-loader" },
			{ test: /\.less$/, use: ['style-loader','css-loader','less-loader']},
			{ test: /\.(css)$/, exclude: /^(https?:)?\/\//, use: ['style-loader','css-loader'] },
			{ test: /\.(woff|woff2|eot|ttf|png)$/,loader: 'url-loader' }
		]
	},

	externals: {},

	entry: {
		docs: path.join(__dirname,'..','/docs-site/main.coffee')
	},
	
	resolve: {
		extensions: [ '.js', '.coffee' , '.tsx', '.ts' ],
		fallback: { "path": false}
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
	}
}

if(process.env.NODE_ENV == 'production'){
	Object.assign(cfg.externals,{
		'react':'React',
		'react-dom':'ReactDOM',
		'lodash':'_',
		'config': JSON.stringify({env:'production'})
	})
}else{
	Object.assign(cfg.externals)
}


module.exports = cfg;