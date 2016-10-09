/* eslint-env browser */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { match, Router, browserHistory, applyRouterMiddleware } from 'react-router';
import useScroll from 'react-router-scroll';
import routes from 'rutas';
import ContextWrapper from 'modulos/ContextWrapper';

// eslint-disable-next-line no-shadow
const shouldUpdateScroll = useScroll((prevRouterProps, { location }) => (
  prevRouterProps && location.pathname !== prevRouterProps.location.pathname
));


// Insert multiple styles
const onInsertCssHandler = (...styles) => {
  const removeCss = styles.map(style => style._insertCss()); // eslint-disable-line no-underscore-dangle
  return () => {
    removeCss.forEach(f => f());
  };
};


match({ routes, history: browserHistory }, (error, redirectLocation, renderProps) => {
  render(
    // eslint-disable-next-line no-underscore-dangle
    <ContextWrapper
      data={window.INITIAL_STATE}
      onInsertCss={onInsertCssHandler}
    >
      <Router
        {...renderProps}
        render={applyRouterMiddleware(shouldUpdateScroll)}
      />
    </ContextWrapper>,
    document.getElementById('app')
  );

  // Remove the pre-rendered CSS (from server) because it's no longer used
  // after the React app is launched and components already have inserted their css
  const cssContainer = document.getElementById('css');
  if (cssContainer) cssContainer.parentNode.removeChild(cssContainer);
});
