import { Dimensions, Animated, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { theme, BaseHeightOffset } from '../../constants';
const window = Dimensions.get('window');
export const IMAGE_WIDTH = window.width;
export const IMAGE_HEIGHT = window.height - 44;
const GuideBottomWrapperHeight =
  window.height - (BaseHeightOffset.head - 30) - BaseHeightOffset.foot;

export const HeadLineWrapper = styled.View`
  position: absolute;
  top: ${BaseHeightOffset.head};
`;

export const HeadLine = styled.View`
  position: relative;
  width: ${IMAGE_WIDTH};
  height: 2px;
  background-color: ${theme.guideColor};
`;

export const BellyLine = styled.View`
  position: relative;
  width: 1px;
  height: ${BaseHeightOffset.foot - (BaseHeightOffset.head + 40)};
  background-color: ${theme.guideColor};
`;

export const BellyLabel = styled.View`
  position: absolute;
  justify-content: center;
  align-items: center;
  left: -53;
  top: ${BaseHeightOffset.foot - (BaseHeightOffset.head + 120)};
  width: 80px;
  height: 30px;
  background-color: ${theme.guideColor};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

export const HeadLabel = styled.View`
  position: absolute;
  justify-content: center;
  align-items: center;
  left: 35;
  top: -28;
  width: 80px;
  height: 30px;
  background-color: ${theme.guideColor};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

export const LabelText = styled.Text`
  color: ${theme.textColor};
  font-weight: bold;
`;

export const FootLineWrapper = styled.View`
  position: absolute;
  top: ${BaseHeightOffset.foot};
`;

export const BellyCenterWrapper = styled.View`
  position: absolute;
  top: ${BaseHeightOffset.head + 20};
  left: ${window.width / 2};
  background-color: ${theme.guideColor};
`;

export const TakeButtonWrapper = styled.View`
  position: relative;
  align-self: center;
  justify-content: center;
  align-items: center;
`;

export const TakeButton = styled(TouchableOpacity)`
  background-color: white;
  width: 70px;
  height: 70px;
  justify-content: center;
  align-items: center;
  border-radius: 35px;
`;

export const TakeButtonInner = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  border: 2px ${theme.pointColor} solid;
`;

export const DisableButton = styled.View`
  background-color: white;
  width: 70px;
  height: 70px;
  justify-content: center;
  align-items: center;
  border-radius: 35px;
`;

export const GuideWrapper = styled.View`
  position: absolute;
  width: ${window.width};
  height: ${BaseHeightOffset.head};
  top: 0;
  justify-content: center;
  align-items: center;
  background-color: ${props =>
    !props.allowed ? 'rgba(221, 103, 112, 0.6)' : 'rgba(106,130,251,0.6)'};
`;

export const GuideBottomWrapper = styled.View`
  position: absolute;
  width: ${window.width};
  height: ${GuideBottomWrapperHeight};
  bottom: 0;
  justify-content: center;
  align-items: center;
  background-color: ${props =>
    !props.allowed ? 'rgba(221, 103, 112, 0.6)' : 'rgba(106,130,251,0.6)'};
`;

export const GuideText = styled(Animated.Text)`
  position: relative;
  color: white;
  font-size: 20px;
  font-weight: bold;
`;
