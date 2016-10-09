/* eslint-disable import/no-extraneous-dependencies */

import Promise from 'bluebird';
/**
 * Copies static files such as robots.txt, favicon.ico to the
 * output (build) folder.
 */
async function copy() {
  const ncp = Promise.promisify(require('ncp'));

  await Promise.all([
    ncp('src/static', 'build/static')
  ]);
}

export default copy;
