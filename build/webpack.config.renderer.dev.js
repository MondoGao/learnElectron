import { resolve } from 'path';
import { spawn } from 'child_process';
import webpack from 'webpack';
import { smart } from 'webpack-merge';

import baseConfig from './webpack.config.renderer.base';

import { devServerPort, publicPath } from '../settings.js';

const outputPath = resolve(__dirname, 'dist');

export default smart(baseConfig, {
  devtool: 'inline-source-map',

  entry: [
    'react-hot-loader/patch',
    './index.js',
  ],

  output: {
    publicPath,
    path: outputPath, 
    filename: 'renderer.dev.js',
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ], 

  devServer: {
    publicPath,
    port: devServerPort,
    compress: true,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*', 
    }, 
    contentBase: outputPath, 
    after(app) {
      console.log('Staring Main Process...');
      spawn(
        'yarn',
        ['run', 'dev:main'],
        { shell: true, env: process.env, stdio: 'inherit' }
      )
        .on('close', code => process.exit(code))
        .on('error', spawnError => console.error(spawnError));
    },
  },
});
