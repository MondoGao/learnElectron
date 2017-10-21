import webpack from 'webpack';
import { smart } from 'webpack-merge';
import { resolve } from 'path';

import baseConfig from './webpack.config.base.js';

import { outputPath } from './settings.js';

export default {
  devtool: 'source-map',
  target: 'electron-main',

  entry: './app/main.dev',

  output: {
    path: outputPath,
    filename: 'main.prod.js',
  }, 
};
