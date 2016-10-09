import React, { Component, PropTypes } from 'react';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import classNames from 'classnames/bind';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Login.module.styl';

const cx = styles::classNames;

const style = {
  marginLeft: 20
};

class Login extends Component {

  getChildContext() {
    return { muiTheme: getMuiTheme(lightBaseTheme) };
  }

  render() {
    return (
      <div className={cx('login-box')}>
        <div className={cx('login')}>
          <Paper zDepth={2}>
            <TextField hintText="nombre de usuario" style={style} underlineShow={false} fullWidth />
            <Divider />
            <TextField hintText="password" style={style} underlineShow={false} fullWidth />
            <Divider />
            <RaisedButton label="Ingresar" primary fullWidth />
          </Paper>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired
};

Login.childContextTypes = {
  muiTheme: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
