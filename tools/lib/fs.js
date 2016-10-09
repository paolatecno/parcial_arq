/* eslint-disable import/no-extraneous-dependencies */

import fs from 'fs';
import mkdirp from 'mkdirp';

const writeFile = (file, contents) => new Promise((resolve, reject) => {
  fs.writeFile(file, contents, 'utf8', (err) => {
    if (err) return reject(err);

    return resolve();
  });
});

const makeDir = (name) => new Promise((resolve, reject) => {
  mkdirp(name, (err) => {
    if (err) return reject(err);

    return resolve();
  });
});

export default { writeFile, makeDir };
