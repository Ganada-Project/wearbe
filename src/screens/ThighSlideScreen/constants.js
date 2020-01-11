import { Dimensions } from 'react-native';
import { BaseHeightOffset } from '../../constants';
export const MAGINIFIER_CONTAINER_SIZE = 100 / 2;
export const SLIDER_HEIGHT = 2;
export const HALF_SLIDER_SIZE = SLIDER_SIZE / 2;
export const SLIDER_SCALE = 1.3;
export const ZOOM = 2;
const window = Dimensions.get('window');
export const SLIDER_SIZE = window.width;
export const IMAGE_WIDTH = window.width;
export const IMAGE_HEIGHT = window.height - 44;

export const LEFT_THIGH_OFFSET = {
  x: IMAGE_WIDTH / 2 - 50,
  y: 0,
};

export const RIGHT_THIGH_OFFSET = {
  x: IMAGE_WIDTH / 2 + 50,
  y: 0,
};
