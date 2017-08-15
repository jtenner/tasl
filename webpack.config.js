const webpack = require('webpack');
const path = require('path');
const Babili = require('babili-webpack-plugin');
let config = {
    entry: './index.js',
    output: null,
    externals: {
        pegjs: 'pegjs'
    }
};
let babelConfig = {
    module: {
        rules: [
            { test: /\.js$/i, exclude: /(node_modules|bower_components)/, use: { loader: 'babel-loader', options: { presets: ['es2015'] } } }
        ]
    }
}
let output = (filename) => ({
    path: path.resolve(__dirname, 'dist'),
    filename,
    library: 'tasl',
    libraryTarget: 'umd'
});
module.exports = [
    Object.assign({}, config, {
        output: output('tasl.js'),
    }),
    Object.assign({}, config, {
        output: output('tasl.min.js'),
        plugins: [
            new Babili()
        ]
    }),
    Object.assign({}, config, babelConfig, {
        output: output('tasl.compat.js')
    }),
    Object.assign({}, config, babelConfig, {
        output: output('tasl.compat.min.js'),
        plugins: [
            new Babili()
        ]
    })
];