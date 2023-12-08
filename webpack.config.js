const path = require('path');

module.exports = {
  entry: './scripts/firebase.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devtool: 'eval-source-map',
};