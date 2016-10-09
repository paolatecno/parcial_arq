/* eslint-disable import/no-extraneous-dependencies */

import del from 'del';
import fs from './lib/fs';

/**
 * Cleans up the output (build) directory.
 */
async function clean() {
  await del(['.tmp', 'build/*', '!build/.git'], { dot: true });
  await fs.makeDir('build/static');
}

export default clean;
