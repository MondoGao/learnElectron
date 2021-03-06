import webpack from 'webpack';
import { smart } from 'webpack-merge';

import baseConfig from './webpack.config.base.js';

export default smart(baseConfig, {
  target: 'electron-renderer', 

  entry: './index.js', 

  module: {
    rules: [
      {
        test: [
          /\.global\.css$/,
          /node_modules.*\.css$/,
        ], 
        use: [
          'style-loader',
          {
            loader: 'css-loader', 
            options: {
              sourceMap: true,
              camelCase: true,
              importLoaders: 1, 
            }, 
          },
          'postcss-loader',
        ]
      },
      {
        test: /^((?!\.global).)*\.css$/,
        exclude: /node_modules/, 
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1, 
              localIdentName: '[name]__[local]__[hash:base64:5]',
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.(phg|svg|jpg|gif)$/,
        loader: 'file-loader',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader',
      },
    ], 
  }, 

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
  ], 

  node: {
    __filename: false,
    __dirname: false,
  },
});
