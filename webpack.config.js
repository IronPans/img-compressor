const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	mode: 'production',
	entry: {
		"img-compressor": path.resolve(__dirname, 'index.js'),
        "img-compressor.min": path.resolve(__dirname, 'index.js')
	},
    output: {
    	path: path.resolve(__dirname, 'dist'),
        library: 'ImgCompressor',
        libraryTarget: 'umd',
        filename: '[name].js'
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            })
        ]
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/
            },
        ]
    },
    resolve: {
        modules: ['./node_modules'],
        extensions: [
            '.js',
            '.jsx'
        ]
    },
    watch: false
}