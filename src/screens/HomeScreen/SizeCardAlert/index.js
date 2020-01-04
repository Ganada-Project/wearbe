import React from 'react';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import { SizeCardAlertText, SizeCardAlertWrapper } from './styles';
import { theme } from '../../../constants';
export const SizeCardAlert = ({ sizeCardAlertTop, sizeCardAlertOpacity }) => (
  <SizeCardAlertWrapper
    style={{
      top: sizeCardAlertTop,
      opacity: sizeCardAlertOpacity,
    }}
  >
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={[theme.pointColor, theme.pointColor]}
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        // opacity: 0.9,
      }}
    >
      <SizeCardAlertText>상품들이 이 사이즈카드로 측정됩니다</SizeCardAlertText>
    </LinearGradient>
  </SizeCardAlertWrapper>
);

SizeCardAlert.propTypes = {
  sizeCardAlertTop: PropTypes.object,
  sizeCardAlertOpacity: PropTypes.object,
};
