/* eslint-disable import/no-extraneous-dependencies */

import webpack from 'webpack';
import webpackConfig from './webpack.config';

const isModule = !!process.env.PWT_BASE_URI;
/**
 * Creates application bundles from the source files.
 */
function bundle() {
  // changes entrypoint in order to bundle server as a module
  if (isModule) {
    webpackConfig[1].entry = './app.js';
    webpackConfig[1].output.filename = '../../index.js';
  }

  return new Promise((resolve, reject) => {
    webpack(webpackConfig).run((err, stats) => {
      if (err) {
        return reject(err);
      }

      console.log(stats.toString(webpackConfig[0].stats));
      return resolve();
    });
  });
}

export default bundle;
