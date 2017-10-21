import { resolve } from 'path';

export default {
  context: resolve(__dirname, '..', 'app'),
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          }, 
        }, 
      },
    ], 
  },

  node: {
    __filename: false,
    __dirname: false,
  },
};
