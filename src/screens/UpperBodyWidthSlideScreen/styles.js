import styled from 'styled-components/native';
import { ImageBackground, Animated, Dimensions } from 'react-native';
import { theme, BaseHeightOffset } from '../../constants';
import {
  SLIDER_SIZE,
  HALF_SLIDER_SIZE,
  IMAGE_WIDTH,
  IMAGE_HEIGHT,
  ZOOM,
} from './constants';

export const window = Dimensions.get('window');

export const Container = styled.View`
  width: 100%;
  height: 100%;
`;

export const ImageContainer = styled(ImageBackground)`
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  width: ${IMAGE_WIDTH};
  height: ${IMAGE_HEIGHT};
`;

export const LeftShoulderGuideWrapper = styled(Animated.View)`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 230;
  left: -10;
  width: 50px;
  height: 50px;
`;

export const LeftChestGuideWrapper = styled(Animated.View)`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 230;
  left: -17;
  width: 50px;
  height: 50px;
`;

export const RightShoulderGuideWrapper = styled(Animated.View)`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 230;
  right: -10;
  width: 50px;
  height: 50px;
`;

export const RightChestGuideWrapper = styled(Animated.View)`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 230;
  right: -17;
  width: 50px;
  height: 50px;
`;

export const MagnifierWrapper = styled(Animated.View)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
`;

export const MagnifierContainer = styled(Animated.View)`
  position: relative;
  width: 100px;
  height: 100px;
  border: 3px solid ${theme.pointColor};
  background-color: black;
  overflow: hidden;
`;

export const MagnifierImage = styled(Animated.Image)`
  width: ${IMAGE_WIDTH * ZOOM};
  height: ${IMAGE_HEIGHT * ZOOM};
`;

export const MagnifierText = styled.Text`
  color: ${theme.pointColor};
  font-weight: bold;
`;

export const MagifierCross = styled.View`
  top: 47;
  left: 47;
  width: 6px;
  height: 6px;
  border-radius: 3px;
  z-index: 100;
  background-color: ${theme.pointColor};
`;

export const Slider = styled(Animated.View)`
  position: absolute;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  width: 30px;
  height: ${window.height};
`;

export const SliderBar = styled.View`
  position: relative;
  width: 1px;
  height: ${window.height};
  background-color: ${theme.guideColor};
`;

export const SliderLabel = styled.View`
  position: absolute;
  justify-content: center;
  align-items: center;
  left: -54;
  top: ${(props) => (!props.isBottom ? 150 : 500)};
  width: 80px;
  height: 30px;
  background-color: ${theme.guideColor};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

export const RightSliderLabel = styled.View`
  position: absolute;
  justify-content: center;
  align-items: center;
  left: -24;
  top: ${(props) => (!props.isBottom ? 150 : 500)};
  width: 80px;
  height: 30px;
  background-color: ${theme.guideColor};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

export const LabelText = styled.Text`
  color: ${theme.textColor};
`;
export const HelpWrapper = styled.View`
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 10;
  bottom: 10;
  height: 50px;
  width: 50px;
  background: ${theme.pointColor};
  border-radius: 25px;
`;

export const GuideImage = styled(Animated.Image)`
  position: absolute;
  width: ${IMAGE_WIDTH};
  height: ${IMAGE_HEIGHT};
`;

export const PartGuideImage = styled.Image`
  width: 100%;
  height: 100%;
`;
