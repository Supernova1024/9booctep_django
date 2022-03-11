let { mix } = require('theme-mix')

mix.setPublicPath('.')

mix.webpackConfig({
  resolve: { 
      symlinks: false,
      modules: [
        path.resolve(__dirname, '..', 'node_modules'),
        'node_modules'
      ],
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /(node_modules\/(core-js|@babel\b)|bower_components)/,
      use: [
        {
          loader: 'babel-loader',
          options: Config.babel()
        }
      ]
    }]
  }
})