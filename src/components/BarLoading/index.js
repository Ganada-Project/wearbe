import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BarIndicator } from 'react-native-indicators';
import { Wrapper } from './styles';
import { theme } from '../../constants';

class BarLoading extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { size, count } = this.props;
    return (
      <Wrapper>
        <BarIndicator size={size} count={count} color={theme.pointColor} />
      </Wrapper>
    );
  }
}

BarLoading.propTypes = {
  size: PropTypes.number,
  count: PropTypes.number,
};

BarLoading.defaultProps = {
  size: 20,
  count: 4,
};

export default BarLoading;
