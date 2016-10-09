import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import styles from './Main.styl';

class Main extends Component {

  getChildContext() {
    return { muiTheme: getMuiTheme(lightBaseTheme) };
  }

  render() {
    const { children } = this.props;
    return (
      <div>
        <AppBar
          title="Administrador de usuarios"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        >
          <a href="#">Salir</a>
        </AppBar>
        <section>{children}</section>
      </div>
    );
  }
}

Main.propTypes = {
  children: PropTypes.node.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired
};

Main.childContextTypes = {
  muiTheme: PropTypes.object.isRequired
};

export default withStyles(styles)(Main);
