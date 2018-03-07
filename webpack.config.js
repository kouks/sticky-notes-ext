const basePath = require('./build/helpers').basePath

module.exports = {
  entry: {
    popup: './src/popup/main.js',
    content: './src/content/main.js',
    background: './src/background/main.js'
  },
  output: {
    path: basePath('dist'),
    publicPath: '/dist/',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@': basePath('src/popup'),
      'config': basePath('config'),
      'vue$': 'vue/dist/vue.runtime.esm.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [basePath('src/popup'), basePath('src/content'), basePath('src/background')],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: [basePath('src/popup'), basePath('src/content'), basePath('src/background')],
        options: {
          loaders: {
            scss: 'vue-style-loader!css-loader!sass-loader',
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [basePath('src/popup'), basePath('src/content'), basePath('src/background')]
      },
    ]
  }
}
