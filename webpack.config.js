const webpack = require('webpack');
const path = require('path');
const Babili = require('babili-webpack-plugin');
let config = {
    entry: './index.js',
    output: null,
    externals: {
        pegjs: 'pegjs',
        fs: 'fs'
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
    library: 'plg',
    libraryTarget: 'umd'
});
module.exports = [
    Object.assign({}, config, {
        output: output('plg.js'),
    }),
    Object.assign({}, config, {
        output: output('plg.min.js'),
        plugins: [
            new Babili()
        ]
    }),
    Object.assign({}, config, babelConfig, {
        output: output('plg.compat.js')
    }),
    Object.assign({}, config, babelConfig, {
        output: output('plg.compat.min.js'),
        plugins: [
            new Babili()
        ]
    })
];