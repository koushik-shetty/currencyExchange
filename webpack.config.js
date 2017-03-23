var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var outDir = 'dist';

var commonConfig = {
	entry: {
		// realeyesCurrencyExchangeClient: './index',
		realeyesCurrencyExchangeServer: './index.server',
	},
	target: 'node',
	output: {
		path: path.resolve(__dirname, outDir),
		filename: '[name].js',
	},
	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['es2015', 'react']
				}
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader',
			},
		],
	},
	devServer: {
		contentBase: path.resolve(__dirname, outDir),
		port: 8090,
	},
	plugins: [
		new CopyWebpackPlugin([
			{
				from: './index.html',
				to: './index.html'
			},
		]),
	],
};

//Server config
var server = Object.assign({}, commonConfig, {
	target: 'node',
	entry: {
		realeyesCurrencyExchangeServer: './index.server',		
	},
});

//Client config
var client = Object.assign({}, commonConfig, {
	entry: {
		realeyesCurrencyExchangeClient: './index',
	},
});

//Multiple configs
module.exports = [
	server,
	client,
];