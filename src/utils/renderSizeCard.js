import { theme } from '../constants';

export function renderIconImage({ empty, sizeCard }) {
  if (empty) {
    return 'plus';
  }
  if (sizeCard.get('gender') === 1) {
    return 'man';
  }
  return 'woman';
}

export function renderProfileBgColor({ sizeCard }) {
  const modular = sizeCard.get('id') % 5;
  if (modular === 0) {
    return theme.pointColor;
  }
  if (modular === 1) {
    return theme.subColor;
  }
  if (modular === 2) {
    return 'green';
  }
  if (modular === 3) {
    return '#0099fe';
  }
  if (modular === 4) {
    return '#2934be';
  }
  return 'black';
}
