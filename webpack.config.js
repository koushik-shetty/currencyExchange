var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var outDir = "dist"

module.exports = {
    entry: './index',
    output : {
        path:path.resolve(__dirname, outDir),
        filename: "realeyesCurrencyExchange.js",
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
        ],
    },
    devServer: {
        contentBase: path.resolve(__dirname, outDir),
        port: 1234,
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: './index.html',
                to: './index.html'
            },
        ]),
    ],
}