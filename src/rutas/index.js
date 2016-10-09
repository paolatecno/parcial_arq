import path from 'path';
import { baseUri } from 'config';
import { Login, Signup, Main, NotFound } from 'vistas';

const routes = [{
  component: Login,
  path: path.join(baseUri, '/login')
}, {
  component: Main,
  path: path.join(baseUri, '/admin'),
  childRoutes: [
    {
      component: Signup,
      path: path.join(baseUri, '/signup')
    }, {
      component: NotFound,
      path: '*'
    }
  ]
}];

export default routes;
