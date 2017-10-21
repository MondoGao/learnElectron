import { resolve } from 'path';
import { spawn } from 'child_process';
import webpack from 'webpack';
import { smart } from 'webpack-merge';

import baseConfig from './webpack.config.renderer.base';

import { devServerPort, publicPath } from './settings.js';

const outputPath = resolve(__dirname, 'dist');

export default smart(baseConfig, {
  devtool: 'inline-source-map',

  output: {
    publicPath,
    path: outputPath, 
    filename: 'renderer.dev.js',
  },

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

  plugins: [
      new webpack.NamedModulesPlugin(),
  ], 

  devServer: {
    publicPath,
    port: devServerPort,
    compress: true,
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
