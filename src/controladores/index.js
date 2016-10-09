import { assign } from 'lodash';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import Helmet from 'react-helmet';
import mongoose from 'mongoose';
import { baseUri } from 'config';
import routes from 'rutas';
import ContextWrapper from 'modulos/ContextWrapper';
import router from 'modulos/expressUtils';
import assets from './assets'; // eslint-disable-line import/no-unresolved
import template from '../vistas/layout.pug';


export default () => {
  // conexion a la base de datos
  mongoose.connect('mongodb://localhost/administrador', (err) => {
    if (!err) {
      console.log('connectado a MongoDB');
    } else {
      throw err;
    }
  });

  const app = router();

  app.get('*', render);

  return app;
};

function render(req, res) {
  match({ routes, location: path.join(baseUri, req.url) }, async (error, redirectLocation, renderProps) => {
    try {
      if (error) return res.status(500).send(error.message);

      if (redirectLocation) return res.redirect(302, redirectLocation.pathname + redirectLocation.search);

      const initialState = {};

      const { params } = renderProps || {};

      // const isNotFound = renderProps.components.some(({ displayName }) =>
      //   displayName === 'WithStyles(NotFound)'
      // );

      const newRenderProps = assign({}, renderProps, { params });
      // const status = isNotFound ? 404 : 200;
      const status = 200;

      // Insert multiple styles
      const css = new Set();
      const onInsertCssHandler = (...styles) => {
        // eslint-disable-next-line no-underscore-dangle
        const removeCss = styles.map(style => css.add(style._getCss()));
        return () => {
          removeCss.forEach(f => f());
        };
      };

      const body = renderToString(
        <ContextWrapper data={initialState} onInsertCss={onInsertCssHandler}>
          <RouterContext {...newRenderProps} />
        </ContextWrapper>
      );

      const head = Helmet.rewind();

      return res.status(status).send(template({
        head,
        body,
        initialState: `window.INITIAL_STATE=${JSON.stringify(initialState)};`,
        // clientConfig: `window.__CONFIG__=${JSON.stringify(config.common)}`,
        js: assets.main.js,
        css: [...css].join('')
      }));
    } catch (e) {
      console.log('e', e); // eslint-disable-line no-console
      return res.status(500).send(e.message);
    }
  });
}
