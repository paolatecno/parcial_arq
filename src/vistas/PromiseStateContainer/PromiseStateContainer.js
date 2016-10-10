import React, { Component, PropTypes } from 'react';
import { PromiseState } from 'react-refetch';
import { OnPending } from 'vistas';

class PromiseStateContainer extends Component {

  static propTypes = {
    ps: PropTypes.instanceOf(PromiseState).isRequired,
    onPending: PropTypes.func,
    onNoResults: PropTypes.func,
    onRejection: PropTypes.func,
    onFulFillment: PropTypes.func.isRequired
  };

  static defaultProps = {
    onPending: () => <OnPending />,
    onNoResults: () => <div />,
    onRejection: reason => <div>{reason}</div>,
    onFulFillment: () => <div />
  }

  isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
  }

  render() {
    const { ps, onPending, onNoResults, onRejection, onFulFillment } = this.props;

    if (ps.pending) {
      return onPending(ps.meta);
    }

    if (ps.rejected) {
      return onRejection(ps.reason, ps.meta);
    }

    if (ps.fulfilled && this.isEmptyObject(ps.value)) {
      return onNoResults(ps.value, ps.meta);
    }

    if (ps.fulfilled) {
      return onFulFillment(ps.value, ps.meta);
    }

    return null;
  }
}

export default PromiseStateContainer;
