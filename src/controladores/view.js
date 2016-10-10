import { connect } from 'react-refetch';
import 'isomorphic-fetch';
import path from 'path';
import { routeUri } from 'config';
import { browserHistory} from 'react-router';

export const loginController = (Component) => (
  connect(() => ({
    tryLogin: user => ({
      tryLoginResponse: {
        url: path.join(routeUri, '/usuarios/login'),
        method: 'POST',
        body: JSON.stringify(user),
        then: (result) => {
          browserHistory.push('/admin/signup');
        }
      }
    })
  }))(Component)
);

export default {
  loginController
};
