import React, { Component, PropTypes } from 'react';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import classNames from 'classnames/bind';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { PromiseState } from 'react-refetch';
import { loginController } from 'controladores/view';
import { PromiseStateContainer } from 'vistas';
import styles from './Login.module.styl';

const cx = styles::classNames;

const style = {
  marginLeft: 20
};

class Login extends Component {

  state = {
    username: '',
    password: ''
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(lightBaseTheme) };
  }

  onTryLogin = () => {
    const { tryLogin } = this.props;
    tryLogin(this.state);
  }

  inputHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const newState = {};
    newState[name] = value;
    this.setState(newState);
  }

  get loginBox() {
    return (
      <div className={cx('login-box')}>
          <div className={cx('login')}>
            <Paper zDepth={2}>
              <TextField
                onChange={this.inputHandler}
                hintText="nombre de usuario"
                style={style}
                underlineShow={false}
                name="username"
                value={this.state.username}
                fullWidth
              />
              <Divider />
              <TextField
                onChange={this.inputHandler}
                hintText="password"
                style={style}
                underlineShow={false}
                name="password"
                value={this.state.password}
                fullWidth
              />
              <Divider />
              <RaisedButton onClick={this.onTryLogin} label="Ingresar" primary fullWidth />
            </Paper>
          </div>
      </div>
    );
  }

  render() {
    const { tryLoginResponse } = this.props;
    return tryLoginResponse
      ? <PromiseStateContainer
        ps={PromiseState.race([tryLoginResponse])}
        onRejection={() => this.loginBox} />
      : this.loginBox;
  }
}

Login.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  tryLogin: PropTypes.func.isRequired,
  tryLoginResponse: PropTypes.instanceOf(PromiseState)
};

Login.childContextTypes = {
  muiTheme: PropTypes.object.isRequired
};

export default loginController(withStyles(styles)(Login));
