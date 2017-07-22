var path = require('path');

module.exports = {
  entry: {
    main: './public/src/main.js'
  },
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, 'public', 'javascripts'),
    library: 'MLib'
  },
  module: {
    loaders: [
      {
        test: /\.jsx|js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
};
