if (!global._babelPolyfill) require('babel-polyfill'); // eslint-disable-line global-require, no-underscore-dangle

/* eslint-disable import/imports-first */
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { baseUri } from 'config';
import mainController from 'controladores';
/* eslint-enable import/imports-first */

const app = express();

app.use(baseUri, express.static(path.join(__dirname, '/static')));
app.use(baseUri, cookieParser());
app.use(baseUri, bodyParser.urlencoded({ extended: true }));
app.use(baseUri, bodyParser.json());

app.use(baseUri, mainController());

export default app;
