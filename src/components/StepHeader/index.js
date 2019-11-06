import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { StepHeadrWrapper } from './styles';
import { theme } from '../../constants';

const labels = ['신장', '부위별 높이', '어깨/가슴', '허리/골반', '허벅지'];
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 2,
  stepStrokeCurrentColor: theme.pointColor,
  stepStrokeWidth: 1,
  stepStrokeFinishedColor: theme.pointColor,
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: theme.pointColor,
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: theme.pointColor,
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: theme.pointColor,
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: theme.pointColor,
};

class StepHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { position } = this.props;
    return (
      <StepHeadrWrapper>
        <StepIndicator customStyles={customStyles} currentPosition={position} />
      </StepHeadrWrapper>
    );
  }
}

StepHeader.propTypes = {
  position: PropTypes.number,
};
export default StepHeader;
