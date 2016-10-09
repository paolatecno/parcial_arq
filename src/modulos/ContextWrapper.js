import { Component, PropTypes, Children } from 'react';

class ContextWrapper extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired,
    onInsertCss: PropTypes.func.isRequired
  }

  // exposes a property to be passed via the Context
  static childContextTypes = {
    data: PropTypes.object.isRequired,
    insertCss: PropTypes.func.isRequired
  }

  // populates the property
  getChildContext() {
    return {
      data: this.props.data,
      insertCss: this.props.onInsertCss
    };
  }

  render() {
    return Children.only(this.props.children);
  }
}

export default ContextWrapper;
