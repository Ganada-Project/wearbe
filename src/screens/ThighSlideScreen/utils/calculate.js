import {
  MAGINIFIER_CONTAINER_SIZE,
  HALF_SLIDER_SIZE,
  SLIDER_HEIGHT,
  IMAGE_WIDTH,
  IMAGE_HEIGHT,
  ZOOM,
} from '../constants';

// 슬라이더에 기반한 돋보기 좌표 조정 로직
export const outputX = ({ xOffset, isStart }) => {
  if (isStart) {
    return (
      -(xOffset * ZOOM - MAGINIFIER_CONTAINER_SIZE) - HALF_SLIDER_SIZE * ZOOM
    );
  }
  return -(
    IMAGE_WIDTH * ZOOM
    + (xOffset * ZOOM - MAGINIFIER_CONTAINER_SIZE)
    + HALF_SLIDER_SIZE * ZOOM
  );
};

export const outputY = ({ yOffset, isStart }) => {
  if (isStart) {
    return (
      -(yOffset * ZOOM - MAGINIFIER_CONTAINER_SIZE) - (SLIDER_HEIGHT / 2) * ZOOM
    );
  }
  return -(
    IMAGE_HEIGHT * ZOOM
    + (yOffset * ZOOM - MAGINIFIER_CONTAINER_SIZE)
    + (SLIDER_HEIGHT / 2) * ZOOM
  );
};

export const distanceBetween2Offset = ({ offset1, offset2 }) => {
  const xDistancePw = Math.pow(offset1.x - offset2.x, 2);
  const yDistancePw = Math.pow(offset1.y - offset2.y, 2);
  const sum = xDistancePw + yDistancePw;
  const result = Math.sqrt(sum);
  return result;
};
