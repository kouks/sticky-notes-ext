const webpack = require('webpack')
const merge = require('webpack-merge')
const config = require('../webpack.config')
const Server = require('webpack-dev-server')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

Object.keys(config.entry).forEach((key) => {
  config.entry[key] = [
    'webpack-dev-server/client/index.js?http://localhost:8080',
    'webpack/hot/dev-server'
  ].concat(config.entry[key]);
});

const compiler = webpack(merge(config, {
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    })
  ],
}))

const server = new Server(compiler, {
  publicPath: '/dist/',
  filename: 'popup.js',
  hot: true,
  stats: { colors: true, cache: true },
  quiet: true
})

server.listen(8080)
