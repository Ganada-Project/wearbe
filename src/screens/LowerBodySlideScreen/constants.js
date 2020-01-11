import { Dimensions } from 'react-native';
export const MAGINIFIER_CONTAINER_SIZE = 100 / 2;
export const SLIDER_SIZE = 26;
export const HALF_SLIDER_SIZE = SLIDER_SIZE / 2;
export const SLIDER_SCALE = 2;
export const ZOOM = 2;
const window = Dimensions.get('window');
export const IMAGE_WIDTH = window.width;
export const IMAGE_HEIGHT = window.height - 44;

export const LEFT_WAIST_OFFSET = {
  x: 100,
  y: 0,
};

export const LEFT_PELVIS_OFFSET = {
  x: 80,
  y: 0,
};

export const RIGHT_PELVIS_OFFSET = {
  x: 220,
  y: 0,
};

export const RIGHT_WAIST_OFFSET = {
  x: 240,
  y: 0,
};
