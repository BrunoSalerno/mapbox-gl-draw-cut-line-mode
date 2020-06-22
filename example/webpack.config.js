var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './index.js'),

  mode: 'development',

  output: {
    path: path.resolve(__dirname, './'),
    filename: './dist.js',
  },

};
